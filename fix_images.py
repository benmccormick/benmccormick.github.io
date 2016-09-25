#!/usr/bin/python

from os import listdir
from os.path import isfile, join
from re import compile
import urllib

class AppURLopener(urllib.FancyURLopener):
    version = 'Magic Browser'

urllib._urlopener = AppURLopener()

img_re = compile('!\[.+?\]\((.*?)\)')

def find_images(path):
    files = [join(path, f)   for f in listdir(path) if isfile(join(path, f))]
    for file_name in files:
        with open(file_name) as file_handle:
            file_text = file_handle.read()
            matches = img_re.finditer(file_text)
            for match in matches:
                img_path = match.group(1)
                img_name = img_path.split('/')[-1]
                img_url = 'http://benmccormick.org' + img_path
                new_img_destination = path + '/images/' + img_name
                try:
                    urllib.urlretrieve(img_url, new_img_destination)
                    print('Downloaded %s and placed it at %s' % (img_url, img_name))
                except Exception as e:
                    print(e)
                    print('Failed to download ' + img_url)


if __name__ == "__main__":
    paths = ['pages/pages', 'pages/posts']
    for path in paths:
        find_images(path)
