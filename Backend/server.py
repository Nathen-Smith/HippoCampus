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

    # data = request.get_json()

    cursor = connection.cursor()
    test = "SELECT FirstName, LastName, CEIL(avg_rating) FROM (SELECT FirstName, LastName, AVG(Rating) as avg_rating FROM Skills NATURAL JOIN User WHERE Skill = 'coding' OR Skill = 'addition' GROUP BY UserID) as temp ORDER BY CEIL(avg_rating) DESC;"
    cursor.execute(test)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])

    return jsonify(result)

@app.route("/findUser", methods=['POST'])
def findUser():
    """ recieves post requests to add new task """
    connection.reconnect()
    cursor = connection.cursor()
    data = request.get_json()

    name = data['name'].split()
    insert_user = 'Insert IGNORE Into User (UserID, FirstName, LastName) VALUES (%s, %s, %s);'
    # hashed_ID = int(data['UserID']) % 2147483647 #pray for no collisions
    hashed_ID = get_db_UserID(data['UserID'])
    cursor.execute(insert_user, (hashed_ID, name[0], name[1]))
    
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

# this is used to find your matches, turns likes id into names
@app.route("/matches", methods=['POST'])
def searchMatches():
    data = request.get_json()
    # this is to used for testing purposes, change to googleid later
    # change the u.UserId in findLikes
    cursor = connection.cursor()
    #will this return likes1-5
    findLikes =     '''select FirstName, LastName, Major, ClassStanding
                    from User
                    where UserId = (select Like1
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = 1)
                    UNION
                    select FirstName, LastName, Major, ClassStanding
                    from User
                    where UserId = (select Like2
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = 1)
                    UNION
                    select FirstName, LastName, Major, ClassStanding
                    from User
                    where UserId = (select Like3
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = 1)
                    UNION
                    select FirstName, LastName, Major, ClassStanding
                    from User
                    where UserId = (select Like4
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = 1)
                    UNION
                    select FirstName, LastName, Major, ClassStanding
                    from User
                    where UserId = (select Like5
                    				from User u NATURAL JOIN Likes l
                    				where u.UserId = 1);
                                    '''
    cursor.execute(findLikes)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify([])
    print(result)
    return jsonify(result)

# @app.route("/")
# def homepage():
#     """ returns rendered homepage """
#     items = db_helper.fetch_todo()
#     print('here')
#     return render_template("index.html", items=items)

if __name__ == "__main__":
        app.run()
