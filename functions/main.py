import requests
import json


def createPreFlightReponse():
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }

    return ('', 204, headers)

def signIn(request):
    print(request.method) 
    
    request_json = json.loads(request.data.decode('utf-8'))

    if request.method == 'OPTIONS':
        return createPreFlightReponse()
    #request_json = request.get_json()
    respheaders = {
        'Access-Control-Allow-Origin': '*'
    }
    print("json request")
    print(request_json)
    userId = request_json.get('user')
    pwd = request_json.get('pwd')
    print("user Id: "+userId)

    apiHeader  = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer keyfXgn8PL6pB3x32"
    }
    url = "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view" 
    response = requests.get(url, headers=apiHeader)
 
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())
    records = response.json();
    uid = None
    for user in records['records']:
        if user['fields']['username'] == userId and user['fields']['password'] == pwd:
            uid = user['id']
            break
    if uid == None:
        return ({'status': 'ERROR', 'msg': 'user id is not found'}, 404, respheaders)
    else:
        return ({'status': 'SUCCESS', 'id':uid, 'msg': 'updated successfully'}, 200, respheaders)

def fetchAllRestaurants(request):
    print(request.method) 
    

    if request.method == 'OPTIONS':
        return createPreFlightReponse()
    #request_json = request.get_json()
    respheaders = {
        'Access-Control-Allow-Origin': '*'
    }
  

    apiHeader  = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer keyfXgn8PL6pB3x32"
    }
    url = "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=100&vieiew=Grid%20view" 
    response = requests.get(url, headers=apiHeader)
 
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())
    records = response.json();
    uid = None
    i =0
    for user in records['records']:
        i = i+1
    print(i)
    return ({'status': 'SUCCESS', 'all':records, }, 200, respheaders)

    