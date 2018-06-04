import requests
import re

url = 'http://www.521609.com/meinvxiaohua/'    #要取得数据的网址
res = '/\/uploads\/allimg\/.*\.[a-zA-Z]+/'  #要匹配的数据规律,正则形式
response = requests.get(url)
# /uploads/allimg/140717/1-140GF92937-lp.jpg
# /uploads/allimg/130413/1-130413093454.jpg
txt = response.text

imgUrls = re.findall(r''+res)
# 网址
urlData = ''
for imgUrl in imgUrls:
    print(imgUrl)
    img_data = requests.get(urlData+'%s'% imgUrl).content #将获取到的数据转换成二进制信息
    #格式化图片名称
    with open(imgUrl.split('/')[-1],'wb') as f:
        f.write(img_data);