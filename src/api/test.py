import requests

res = requests.post('http://127.0.0.1:8000/blog/post/', data={'a':3, 'b':4})

print(res.text)