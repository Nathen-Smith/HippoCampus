from flask import (Flask, render_template, request, redirect, jsonify)
from flask_cors import CORS
import mysql.connector, atexit, csv
from mysql.connector import Error
import numpy as np


app = Flask(__name__)
CORS(app)

dbIP = '35.238.147.89'
dbUser = "root"
dbPass = "b49NteBOf7k5gar3"
dbName = 'HippoCampus'

connection = mysql.connector.connect(host = dbIP, user = dbUser, password = dbPass, database = dbName)
SQL_MAX_NUM = 2147483647

def _get_db_UserID(google_Id):
    return str(int(google_Id) % SQL_MAX_NUM)


@app.route("/create", methods=['POST'])
def create():
    """ recieves post requests to add new task """

    data = request.get_json()
    connection.reconnect()
    cursor = connection.cursor()
    cursor.execute("DROP TRIGGER IF EXISTS skilltrigger")
    t = "CREATE TRIGGER skilltrigger BEFORE INSERT ON Skills FOR EACH ROW BEGIN IF NEW.Rating > 5 THEN SET NEW.Rating = 5; END IF; IF NEW.Rating < 1 THEN SET New.Rating = 1; END IF; END"
    cursor.execute(t)

    hashed_ID = _get_db_UserID(data['UserID'])
    insert_user = 'Insert IGNORE Into User (UserID) VALUES (' + hashed_ID + ');'
    cursor.execute(insert_user)

    insert_likes = 'REPLACE Into Skills (UserID, Skill, Rating) VALUES (%s, %s, %s);'
    cursor = connection.cursor()
    cursor.execute(insert_likes, (hashed_ID, data['Skill'], data['Rating']))

    test = 'Select * From Skills WHERE UserID = ' + hashed_ID + ';'
    cursor = connection.cursor()
    cursor.execute(test)
    result = cursor.fetchall()
    connection.commit()
    return jsonify(result)

@app.route("/update", methods=['POST'])
def update():
    """ recieves post requests to add new task """

    data = request.get_json()

    update_likes = 'Update Skills SET Rating = %s where UserID = %s and Skill = %s'
    cursor = connection.cursor()
    cursor.execute(update_likes, (data['Rating'], data['UserID'], data['Skill']))

    #result = {'success': True, 'response': 'Done'}

    cursor = connection.cursor()
    test = 'Select * From Skills Where UserID = ' + data["UserID"] + ';'
    cursor.execute(test)
    result = cursor.fetchall()
    connection.commit()
    return jsonify(result)

@app.route("/delete", methods=['POST'])
def delete():
    """ recieves post requests to add new task """

    data = request.get_json()

     # delete_likes = 'Delete From (SELECT * FROM Skills WHERE UserID = ' + data["UserID"] + ' and ' + data["Skill"] + ') as temp ;'
    delete_likes = 'DELETE FROM Skills WHERE UserID = ' + data["UserID"] + ';'
    cursor = connection.cursor()
    cursor.execute(delete_likes)

    #result = {'success': True, 'response': 'Done'}

    cursor = connection.cursor()
    test = 'Select * From Skills Where UserID = ' + data["UserID"] + ';'
    cursor.execute(test)
    result = cursor.fetchall()
    connection.commit()

    return jsonify(result)

@app.route("/search", methods=['POST'])
def search():
    """ recieves post requests to add new task """

    data = request.get_json()
    connection.reconnect()
    cursor = connection.cursor()
    test = 'Select Skill From Skills Where UserID = ' + _get_db_UserID(data["UserID"]) + ';'
    cursor.execute(test)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])

    return jsonify(result)

@app.route("/advanced", methods=['POST'])
def advanced():
    """ recieves post requests to add new task """

    #data = request.get_json()

    cursor = connection.cursor()
    test = "SELECT FirstName, LastName, CEIL(avg_rating) FROM (SELECT FirstName, LastName, AVG(Rating) as avg_rating FROM Skills NATURAL JOIN User WHERE Skill = 'coding' OR Skill = 'addition' GROUP BY UserID) as temp ORDER BY CEIL(avg_rating) DESC;"
    cursor.execute(test)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])

    return jsonify(result)

@app.route("/filter", methods=['POST'])
def filter():
    """ recieves post requests to add new task """

    data = request.get_json()
    hashed_ID = _get_db_UserID(data["UserID"])
    cursor = connection.cursor()

    proc =  '''
            CREATE DEFINER=`root`@`%` PROCEDURE `Filter`(
                IN my_id INTEGER)
            BEGIN
                DECLARE curr_FirstName VARCHAR(30);
                DECLARE curr_LastName VARCHAR(30);
                DECLARE curr_Major VARCHAR(20);
                DECLARE curr_ClassStanding VARCHAR(20);
                DECLARE curr_Bio VARCHAR(300);

                DECLARE curr_pref VARCHAR(30);
                DECLARE exit_loop BOOLEAN DEFAULT FALSE;

                DECLARE prefs_cur CURSOR FOR (SELECT Preference FROM Preferences WHERE UserID = my_id);
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;

                DROP TABLE IF EXISTS Similar_Skills_Table;
                DROP TABLE IF EXISTS Similar_Major_Table;
                DROP TABLE IF EXISTS Similar_ClassStanding_Table;

                CREATE TABLE Similar_Skills_Table (
                    FirstName VARCHAR(30),
                    LastName VARCHAR(30),
                    Major VARCHAR(20),
                    ClassStanding VARCHAR(20),
                    Bio VARCHAR(300)
                );
                CREATE TABLE Similar_Major_Table (
                    FirstName VARCHAR(30),
                    LastName VARCHAR(30),
                    Major VARCHAR(20),
                    ClassStanding VARCHAR(20),
                    Bio VARCHAR(300)
                );
                CREATE TABLE Similar_ClassStanding_Table (
                    FirstName VARCHAR(30),
                    LastName VARCHAR(30),
                    Major VARCHAR(20),
                    ClassStanding VARCHAR(20),
                    Bio VARCHAR(300)
                );

                OPEN prefs_cur;
                    REPEAT
                        FETCH prefs_cur INTO curr_pref;

                        IF (curr_pref = 'Similar Skills') THEN
                            BEGIN

                                DECLARE nested_exit_loop BOOLEAN DEFAULT FALSE;
                                DECLARE skill_cur CURSOR FOR (
                                    SELECT FirstName, LastName, ClassStanding, Major, Bio 
                                    FROM Skills NATURAL JOIN User
                                    WHERE Skill IN (
                                        SELECT Skill FROM Skills WHERE UserID = my_id ORDER BY Rating DESC
                                    ) AND UserID <> my_id
                                );
                                DECLARE CONTINUE HANDLER FOR NOT FOUND SET nested_exit_loop = TRUE;
                                OPEN skill_cur;
                                    REPEAT
                                        FETCH skill_cur INTO curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio;
                                            INSERT INTO Similar_Skills_Table (FirstName, LastName, Major, ClassStanding, Bio) 
                                            VALUES (curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio); 
                                    UNTIL nested_exit_loop
                                    END REPEAT;
                                CLOSE skill_cur;
                            END;

                        ELSEIF (curr_pref = 'Major') THEN
                            BEGIN

                                DECLARE nested_exit_loop BOOLEAN DEFAULT FALSE;
                                DECLARE major_cur CURSOR FOR (
                                    (SELECT FirstName, LastName, ClassStanding, Major, Bio 
                                    FROM User
                                    WHERE Major IN (SELECT Major FROM User Where UserID = my_id) AND UserID <> my_id)
                                    UNION
                                    (SELECT FirstName, LastName, ClassStanding, Major, Bio 
                                    FROM User
                                    WHERE Major = 'CE' AND UserID <> my_id)
                                );
                                DECLARE CONTINUE HANDLER FOR NOT FOUND SET nested_exit_loop = TRUE;
                                OPEN major_cur;
                                    REPEAT
                                        FETCH major_cur INTO curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio;
                                            INSERT INTO Similar_Major_Table (FirstName, LastName, Major, ClassStanding, Bio) 
                                            VALUES (curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio); 
                                    UNTIL nested_exit_loop
                                    END REPEAT;
                                CLOSE major_cur;
                            END;

                        ELSEIF (curr_pref = 'Class Standing') THEN
                            BEGIN

                                DECLARE nested_exit_loop BOOLEAN DEFAULT FALSE;
                                DECLARE class_cur CURSOR FOR (
                                    SELECT FirstName, LastName, ClassStanding, Major, Bio 
                                    FROM User
                                    WHERE UserID IN (SELECT Major FROM User Where UserID = my_id) AND UserID <> my_id
                                );
                                DECLARE CONTINUE HANDLER FOR NOT FOUND SET nested_exit_loop = TRUE;
                                OPEN class_cur;
                                    REPEAT
                                        FETCH class_cur INTO curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio;
                                            INSERT INTO Similar_ClassStanding_Table (FirstName, LastName, Major, ClassStanding, Bio) 
                                            VALUES (curr_FirstName, curr_LastName, curr_Major, curr_ClassStanding, curr_Bio); 
                                    UNTIL nested_exit_loop
                                    END REPEAT;
                                CLOSE class_cur;
                            END;
                        END IF;

                    UNTIL exit_loop
                    END REPEAT;
                CLOSE prefs_cur;

                (SELECT DISTINCT * FROM Similar_Skills_Table)
                UNION
                (SELECT DISTINCT * FROM Similar_Major_Table)
                UNION
                (SELECT DISTINCT * FROM Similar_ClassStanding_Table);

            END
            '''

    cursor.callproc('Filter', [int(hashed_ID)])
    # suggestions = []
    for result in cursor.stored_results():
        suggestions = (result.fetchall())

    return jsonify(suggestions)

@app.route("/getUserInfo", methods=['POST'])
def getUserInfo():
    """ recieves post requests to add new task """

    data = request.get_json()

    cursor = connection.cursor()
    # test = 'Select * From User Where UserID = ' + _get_db_UserID(data["UserID"]) + ';'
    test = 'Select * From Skills Where UserID = 5 ;'

    cursor.execute(test)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])

    return jsonify(result)   

@app.route("/findUser", methods=['POST'])
def findUser():
    """ recieves post requests to add new task """

    data = request.get_json()
    connection.reconnect()
    cursor = connection.cursor()
    data = request.get_json()
    hashed_ID = _get_db_UserID(data['UserID'])

    name = data['name'].split()
    # make sure data is in main User db. Also add to others if needed
    insert_user = 'Insert IGNORE Into User (UserID, FirstName, LastName) VALUES (%s, %s, %s);'
    cursor.execute(insert_user, (hashed_ID, name[0], name[1]))

    insert_user = 'Insert IGNORE Into Availability (UserID) VALUES (' + hashed_ID + ');'
    cursor.execute(insert_user)
    # insert_user = 'Insert IGNORE Into Skills (UserID) VALUES (' + hashed_ID + ');'
    # cursor.execute(insert_user)

    test = 'select * from User WHERE UserID = ' + hashed_ID + ';'
    cursor = connection.cursor()
    cursor.execute(test)
    result = cursor.fetchall()
    connection.commit()
    if len(result) == 0:
        return jsonify([])

    return jsonify(result)

@app.route("/deleteSkill", methods=['POST'])
def deleteSkill():
    """ recieves post requests to add new task """
    connection.reconnect()

    data = request.get_json()

    test = 'DELETE From Skills Where UserID = %s and Skill = %s;'
    cursor = connection.cursor()

    cursor.execute(test, (_get_db_UserID(data["UserID"]), data["Skill"]))
    connection.commit()

    return jsonify("Success")

@app.route("/deletePerson", methods=['POST'])
def deletePerson():
    """ recieves post requests to add new task """
    connection.reconnect()
    data = request.get_json()
    hashed_ID = _get_db_UserID(data["UserID"])
    deleting_ID = str(data["personUserID"])
    print(deleting_ID)
    delete_query_like1 = '''  update Likes
                        set Like1 = IF(Like1 = ''' + deleting_ID + ''', null, Like1)
                        where UserId = ''' + hashed_ID + '''; '''
    delete_query_like2 ='''update Likes
                        set Like2 = IF(Like2 = ''' + deleting_ID + ''', null, Like2)
                        where UserId = ''' + hashed_ID + ''';'''
    delete_query_like3 = '''update Likes
                        set Like3 = IF(Like3 = ''' + deleting_ID + ''', null, Like3)
                        where UserId = ''' + hashed_ID + ''';'''
    delete_query_like4 =  '''update Likes
                        set Like4 = IF(Like4 = ''' + deleting_ID + ''', null, Like4)
                        where UserId = ''' + hashed_ID + ''';'''
    delete_query_like5 = '''update Likes
                        set Like5 = IF(Like5 = ''' + deleting_ID + ''', null, Like5)
                        where UserId = ''' + hashed_ID + ''';'''

    cursor = connection.cursor()

    cursor.execute(delete_query_like1)
    cursor.execute(delete_query_like2)
    cursor.execute(delete_query_like3)
    cursor.execute(delete_query_like4)
    cursor.execute(delete_query_like5)
    connection.commit()

    return jsonify("Success")

# this is used to find your matches, turns likes id into names
@app.route("/matches", methods=['POST'])
def searchMatches():
    data = request.get_json()
    # this is to used for testing purposes, change to googleid later
    # change the u.UserId in findLikes
    cursor = connection.cursor()
    #will this return likes1-5
    hashed_ID = _get_db_UserID(data['UserID'])
    print(hashed_ID)
    # hashed_ID = "1" # this is temporary remove when done w testing
    findLikes =     '''select FirstName, LastName, Major, ClassStanding, UserId
                    from User
                    where UserId = (select Like1
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId =''' + hashed_ID + ''')
                    UNION
                    select FirstName, LastName, Major, ClassStanding, UserId
                    from User
                    where UserId = (select Like2
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = ''' + hashed_ID + ''')
                    UNION
                    select FirstName, LastName, Major, ClassStanding, UserId
                    from User
                    where UserId = (select Like3
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = ''' + hashed_ID + ''')
                    UNION
                    select FirstName, LastName, Major, ClassStanding, UserId
                    from User
                    where UserId = (select Like4
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = ''' + hashed_ID + ''')
                    UNION
                    select FirstName, LastName, Major, ClassStanding, UserId
                    from User
                    where UserId = (select Like5
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = ''' + hashed_ID + ''');
                                    '''
    cursor.execute(findLikes)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])
    print(result)
    return jsonify(result)


@app.route("/updateAvailability", methods=['POST'])
def updateAvailability():
    """ recieves post requests to add new task """    

    data = request.get_json()

    connection.reconnect()

    hashed_ID = _get_db_UserID(data['UserID'])
    update_availability = 'REPLACE INTO Availability (UserID, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);'
    cursor = connection.cursor()
    cursor.execute(update_availability, (hashed_ID, data['Monday'], data['Tuesday'], data['Wednesday'], data['Thursday'], data['Friday'], data['Saturday'], data['Sunday']))

    #result = {'success': True, 'response': 'Done'}

    # cursor = connection.cursor()
    connection.commit()
    connection.reconnect()
    cursor = connection.cursor()

    test = 'Select * From Availability Where UserID = ' + hashed_ID + ';'
    # above does not return anything for some reason
    cursor.execute(test)
    result = cursor.fetchall()
    # if len(result) == 0:
    #     return jsonify([])

    return jsonify(result)

@app.route("/updateUser", methods=['POST'])
def updateUser():
    """ recieves post requests to add new task """

    data = request.get_json()

    connection.reconnect()

    hashed_ID = _get_db_UserID(data['UserID'])
    update_user = 'REPLACE INTO User (UserID, Age, ClassStanding, FirstName, LastName, Location, Major, Minor, Bio, Statement) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    cursor = connection.cursor()
    cursor.execute(update_user, (hashed_ID, data['Age'], data['ClassStanding'], data['FirstName'], data["LastName"], data["Location"], data["Major"], data["Minor"], data["Bio"], data["Statement"]))
 
    connection.commit()
    connection.reconnect()
    #result = {'success': True, 'response': 'Done'}

    cursor = connection.cursor()
    test = 'Select * From User Where UserID = ' + hashed_ID + ';'
    cursor.execute(test)
    result = cursor.fetchall()
    
    return jsonify(result)

@app.route("/autoFillDays", methods=['POST'])
def autoFillDays():
    """ recieves post requests to add new task """
    connection.reconnect()

    data = request.get_json()

    test = 'SELECT * From Availability Where UserID = ' + _get_db_UserID(data["UserID"]) + ';'
    cursor = connection.cursor()

    cursor.execute(test)
    result = cursor.fetchall()

    return jsonify(result)

@app.route("/updatePrefs", methods=['POST'])
def updatePrefs():
    """ recieves post requests to add new task """
    # connection.reconnect()
    data = request.get_json()
    cursor = connection.cursor()

    # d = 'DROP TABLE IF EXISTS Preferences;'
    # cursor.execute(d)
    # connection.commit()
    # return(jsonify('ok'))

    # p = 'CREATE TABLE Preferences(UserID INTEGER NOT NULL, Preference VARCHAR(30) NOT NULL, FOREIGN KEY(UserID) References User(UserID) ON DELETE CASCADE, PRIMARY KEY(UserID, Preference) );'
    # cursor.execute(p)
    # Preferences: UserID INT, Preference VARCHAR30, Rating INT, PK(UserID, Preference)
    hashed_ID = _get_db_UserID(data["UserID"])
    r = 'DELETE FROM Preferences WHERE UserID = ' + hashed_ID + ';'
    cursor.execute(r)
    for i in range(len(data["Preferences"])):
        q = 'INSERT IGNORE INTO Preferences (UserID, Preference) VALUES (%s, %s);'
        cursor.execute(q, (hashed_ID, data["Preferences"][i]))
    
    s = 'SELECT * FROM Preferences WHERE UserID = ' + hashed_ID + ';'
    cursor = connection.cursor()

    cursor.execute(s)
    result = cursor.fetchall()
    connection.commit()
    return jsonify(result)
    
# @app.route("/")
# def homepage():
#     """ returns rendered homepage """
#     items = db_helper.fetch_todo()
#     print('here')
#     return render_template("index.html", items=items)

if __name__ == "__main__":
        app.run()
