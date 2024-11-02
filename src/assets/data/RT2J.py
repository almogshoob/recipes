import re
import json
import argparse

def get_list_or_sub_lists(txt_list):
  parts = re.split(r'\n(.*):\n', txt_list)
  if (len(parts) == 1):
    list = parts[0].split('\n')[1:]
  else:
    sub_lists = [{'group': parts[i], 'items': parts[i+1].split('\n')} for i in range(1, len(parts), 2)]
    list = sub_lists
  return list


parser = argparse.ArgumentParser()
parser.add_argument('-f', '--filepath', help='File path: ./file.txt')
args = parser.parse_args()
file_path = args.filepath

# check args
if not file_path:
  print('Error: no file path found. Use --help for more.')
if not file_path.lower().endswith('.txt'):
  print('Error: use only txt files. Use --help for more.')

# read file
text = open(file_path, 'r', encoding='utf-8').read()

# build json object
json_recipes = {}
txt_recipes = text.split('***')
for txt_recipe in txt_recipes:
  parts = txt_recipe.strip().split('\n\n')

  header = parts[0].split('\n')
  tags = [tag.strip() for tag in header.pop().split(',')]
  recipe_id, title, duration, quantity, image = header[0], header[1], header[2], header[3], header[4]
  link = header[5] if len(header) == 6 else ''

  ingredients = get_list_or_sub_lists(parts[1])
  steps = get_list_or_sub_lists(parts[2])
  comments = parts[3].split('\n')[1:] if len(parts) == 4 else []

  json_recipes[recipe_id] = {
    'title': title,
    'duration': duration,
    'quantity': quantity,
    'image':  image,
    'link':  link,
    'ingredients': ingredients,
    'steps': steps,
    'comments': comments,
    'tags': tags,
  }

# save file
with open('recipes.json', 'w', encoding='utf-8') as outfile:
    json.dump(json_recipes, outfile, ensure_ascii=False, indent=4)
