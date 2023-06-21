import requests

url = 'http://localhost:8085'


def list_items():
    return requests.get(url+'/notes')


def list_with_id(noteId):
    return requests.get(url+f'/notes/{noteId}')


def make_note(data):
    return requests.post(url+'/notes', data=data)


def edit_note(noteId, new_data):
    return requests.put(url+f'/notes/{noteId}', data=new_data)


def delete_note(noteId):
    return requests.delete(url+f'/notes/{noteId}')


def new_data(title='catatan',
             tags=['tag 1', 'tag 2', 'tag 3'],
             body='isi dari catatan nya'):
    return {
            'title': title,
            'tags': tags,
            'body': body,
            }


def test_can_add_new_note():
    body = new_data()
    response = make_note(body)
    assert response.status_code == 201
    assert response.headers['content-type'] == 'application/json; charset=utf-8'
    assert response.json()['status'] == 'success'
    noteId = response.json()['data']['noteId']
    assert noteId != 0
    pass


def test_make_with_bad_data():
    badNotePayloads = [
        {'tags': ["Android", "Web"], 'body': "Isi dari catatan A"},
        {'title': 1, 'tags': ["Android", "Web"], 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'tags': [1, "2"], 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'tags': ["Android", "Web"]},
        {'title': "Catatan A", 'tags': ["Android", "Web"], 'body': True}
    ]
    for bad in range(len(badNotePayloads)):
        print(badNotePayloads[bad])
        response = make_note(badNotePayloads[bad])
        assert response.status_code == 400
        assert response.headers['content-type'] == 'application/json; charset=utf-8'
        assert response.json()['status'] == 'fail'
        pass


def test_can_get_all_items():
    response = list_items()
    assert response.status_code == 200
    assert response.headers['content-type'] == 'application/json; charset=utf-8'
    assert response.json()['status'] == 'success'
    data = response.json()['data']['notes']
    assert data != 0
    pass


def test_can_get_item_by_id():
    body = new_data()
    response = make_note(body)
    noteId = response.json()['data']['noteId']
    getnote = list_with_id(noteId)
    assert getnote.status_code == 200
    assert getnote.headers['content-type'] == 'application/json; charset=utf-8'
    assert getnote.json()['status'] == 'success'
    data = getnote.json()['data']['note']
    assert data != 0
    assert 'id' in data
    assert 'title' in data
    assert 'body' in data
    assert 'tags' in data
    pass


def test_can_edit_item_by_id():
    body = new_data()
    response = make_note(body)
    noteId = response.json()['data']['noteId']
    change = {
            'title': 'ganti catatan 1',
            'tags': ['test ganti catatan 1', 'test 2'],
            'body': 'isi dari catatannya',
            }
    edit = edit_note(noteId, change)
    assert edit.status_code == 200
    assert edit.headers['content-type'] == 'application/json; charset=utf-8'
    assert edit.json()['status'] == 'success'
    check = list_with_id(noteId)
    data = check.json()['data']['note']
    assert data['title'] == change['title']
    assert data['tags'] == change['tags']
    assert data['body'] == change['body']


def test_edit_with_bad_data():
    body = new_data()
    response = make_note(body)
    noteId = response.json()['data']['noteId']
    badNotePayloads = [
        {'tags': ["Android", "Web"], 'body': "Isi dari catatan A"},
        {'title': 1, 'tags': ["Android", "Web"], 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'tags': [1, "2"], 'body': "Isi dari catatan A"},
        {'title': "Catatan A", 'tags': ["Android", "Web"]},
        {'title': "Catatan A", 'tags': ["Android", "Web"], 'body': True}
    ]
    for bad in range(len(badNotePayloads)):
        print(badNotePayloads[bad])
        response = edit_note(noteId, badNotePayloads[bad])
        assert response.status_code == 400
        assert response.headers['content-type'] == 'application/json; charset=utf-8'
        assert response.json()['status'] == 'fail'
        pass


def test_can_delete_item_by_id():
    body = new_data()
    response = make_note(body)
    noteId = response.json()['data']['noteId']
    print(noteId)
    delete = delete_note(noteId)
    print(delete.json())
    assert delete.status_code == 200
    assert delete.headers['content-type'] == 'application/json; charset=utf-8'
    assert delete.json()['status'] == 'success'
    print(noteId)
    check = list_with_id(noteId)
    print(check.json())
    assert check.json()['status'] == 'success'
