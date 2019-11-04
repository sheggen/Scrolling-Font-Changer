#!/usr/bin/python

import re
from pprint import pprint
import json

f = open("tmpTxt",'r')

json_map = {}

description_line = 0
single_item_html = ""
for idx,line in enumerate(f.readlines()):
    text = line.strip()
    if text == "":
        continue

    if re.match("^\d\d?\.", text):
        if single_item_html != "":
            json_map["image" + str(idx) + ".jpg"] = single_item_html
        single_item_html = ""
        description_line = 0
        continue

    description_line += 1

    if description_line == 2:
        single_item_html += "<p><b><em>" + text + "</b></em></p>"
    else:
        single_item_html += "<p>" + text + "</p>"

json_map["image999.jpg"] = single_item_html

print(json.dumps(json_map, indent=4))
