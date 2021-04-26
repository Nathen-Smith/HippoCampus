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

#queries
# def fetch_todo() -> dict:
#     """Reads all tasks listed in the todo table

#     Returns:
#         A list of dictionaries
#     """

#     conn = db.connect()
#     query_results = conn.execute("SELECT * from Likes;").fetchall()
#     conn.close()
#     todo_list = []
#     for result in query_results:
#         item = {
#             "UserID": result[0],
#             "Like1": result[1],
#             "Like2": result[2],
#             "Like3": result[3],
#             "Like4": result[4],
#             "Like5": result[5]
#         }
#         todo_list.append(item)

#     return todo_list


# def update_like1_entry(UserID: int, LikeID: int) -> None:
#     """Updates user description based on given `user_id`

#     Args:
#         UserID (int): Targeted UserID
#         text (str): Updated description

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update Likes set Like1 = "{}" where UserID = {};'.format(LikeID, UserID)
#     conn.execute(query)
#     conn.close()


# def update_like2_entry(UserID: int, LikeID: int) -> None:
#     """Updates task status based on given `UserID`

#     Args:
#         UserID (int): Targeted UserID
#         text (str): Updated status

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update Likes set Like2 = "{}" where UserID = {};'.format(LikeID, UserID)
#     conn.execute(query)
#     conn.close()

# def update_like3_entry(UserID: int, LikeID: int) -> None:
#     """Updates task status based on given `UserID`

#     Args:
#         UserID (int): Targeted UserID
#         text (str): Updated status

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update Likes set Like3 = "{}" where UserID = {};'.format(LikeID, UserID)
#     conn.execute(query)
#     conn.close()

# def update_like4_entry(UserID: int, LikeID: int) -> None:
#     """Updates task status based on given `UserID`

#     Args:
#         UserID (int): Targeted UserID
#         text (str): Updated status

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update Likes set Like4 = "{}" where UserID = {};'.format(LikeID, UserID)
#     conn.execute(query)
#     conn.close()

# def update_like5_entry(UserID: int, LikeID: int) -> None:
#     """Updates task status based on given `UserID`

#     Args:
#         UserID (int): Targeted UserID
#         text (str): Updated status

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update Likes set Like5 = "{}" where UserID = {};'.format(LikeID, UserID)
#     conn.execute(query)
#     conn.close()


# def insert_new_likes(Like1: int, Like2: int, Like3: int, Like4: int, Like5: int) ->  int:
#     """Insert new task to todo table.

#     Args:
#         text (str): Task description

#     Returns: The task ID for the inserted entry
#     """
#     query = 'Insert Into Likes (Like1, Like2, Like3, Like4, Like5) VALUES ("{}", "{}", "{}", "{}", "{}");'.format(
#         Like1, Like2, Like3, Like4, Like5)

#     conn.execute(query)
#     query_results = conn.execute("Select LAST_INSERT_ID();")
#     query_results = [x for x in query_results]
#     UserID = query_results[0][0]
#     conn.close()

#     return UserID


# def remove_like_by_id(UserID: int) -> None:
#     """ remove entries based on task ID """
#     conn = db.connect()
#     query = 'Delete From Likes where UserID={};'.format(UserID)
#     conn.execute(query)
#     conn.close()


# @app.route("/saveChange", methods=['POST'])
# def saveChange():
#     results = request.get_json()
#     print(results)
#     return "SUCCESS"

# @app.route("/delete/<int:UserID>", methods=['POST'])
# def delete(UserID):
#     """ recieved post requests for entry delete """

#     try:
#         db_helper.remove_like_by_id(UserID)
#         result = {'success': True, 'response': 'Removed task'}
#     except:
#         result = {'success': False, 'response': 'Something went wrong'}

#     return jsonify(result)


# @app.route("/edit/<int:UserID>", methods=['POST'])
# def update(UserID):
#     """ recieved post requests for entry updates """

#     data = request.get_json()

#     try:
#         if "Like1" in data:
#             db_helper.update_Like1_entry(UserID, data["Like1"])
#             result = {'success': True, 'response': 'Like1 Updated'}
#         elif "Like2" in data:
#             db_helper.update_Like2_entry(UserID, data["Like2"])
#             result = {'success': True, 'response': 'Like2 Updated'}
#         elif "Like3" in data:
#             db_helper.update_Like3_entry(UserID, data["Like3"])
#             result = {'success': True, 'response': 'Like3 Updated'}
#         elif "Like4" in data:
#             db_helper.update_Like4_entry(UserID, data["Like4"])
#             result = {'success': True, 'response': 'Like4 Updated'}
#         elif "Like5" in data:
#             db_helper.update_Like5_entry(UserID, data["Like5"])
#             result = {'success': True, 'response': 'Like5 Updated'}
#         else:
#             result = {'success': True, 'response': 'Nothing Updated'}
#     except:
#         result = {'success': False, 'response': 'Something went wrong'}

#     return jsonify(result)


@app.route("/create", methods=['POST'])
def create():
    """ recieves post requests to add new task """

    data = request.get_json()
    # UserID = np.random.randint(1001, 1500)
    # insert_user = 'Insert Into Skills (UserID) VALUES (' + str(UserID) + ');'
    # cursor = connection.cursor()
    # cursor.execute(insert_user)
    connection.reconnect()
    # UserID = data['UserID']
    cursor = connection.cursor()
    cursor.execute("DROP TRIGGER IF EXISTS skilltrigger")
    t = "CREATE TRIGGER skilltrigger BEFORE INSERT ON Skills FOR EACH ROW BEGIN IF NEW.Rating > 5 THEN SET NEW.Rating = 5; END IF; IF NEW.Rating < 1 THEN SET New.Rating = 1; END IF; END"
    cursor.execute(t)

    insert_user = 'Insert IGNORE Into User (UserID) VALUES (' + data['UserID'] + ');'
    # cursor = connection.cursor()
    cursor.execute(insert_user)
    insert_likes = 'REPLACE Into Skills (UserID, Skill, Rating) VALUES (%s, %s, %s);'
    cursor = connection.cursor()
    cursor.execute(insert_likes, (data['UserID'], data['Skill'], data['Rating']))

    # result = {'success': True, 'response': 'Done'}


    test = 'Select * From Skills WHERE UserID = ' + data['UserID'] + ';'
    # test = 'Select * From Skills WHERE

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
    test = 'Select Skill From Skills Where UserID = ' + str(data["UserID"]) + ';'
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

    # data = request.get_json()
    connection.reconnect()

    cursor = connection.cursor()
    data = request.get_json()
    name = data['name'].split()
    # test = "SELECT FirstName, LastName, CEIL(avg_rating) FROM (SELECT FirstName, LastName, AVG(Rating) as avg_rating FROM Skills NATURAL JOIN User WHERE Skill = 'coding' OR Skill = 'addition' GROUP BY UserID) as temp ORDER BY CEIL(avg_rating) DESC;"
    insert_user = 'Insert IGNORE Into User (UserID, FirstName, LastName) VALUES (%s, %s, %s);'
    hashed_ID = int(data['UserID']) % 2147483647
    cursor.execute(insert_user, (str(hashed_ID), name[0], name[1]))
    test = 'select * from User ORDER BY UserID DESC LIMIT 1'
    cursor.execute(test)
    result = cursor.fetchall()
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

    cursor.execute(test, (str(data["UserID"]), data["Skill"]))
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
