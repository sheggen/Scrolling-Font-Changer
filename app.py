from flask import Flask, render_template, request, redirect, url_for
import threading, time

app = Flask(__name__)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/young')
def young():
	return render_template("main.html", age = "young")

@app.route('/old')
def old():
	return render_template("main.html", age = "old")

@app.route('/editDisplay')
def editDisplay():
	return render_template("editDisplay.html")


@app.route('/getWords')
def getWords():
	f = open('currentFont.txt', 'r')
	font = f.readline()
	# print(font)
	f.close()
	
	f = open('words.txt', 'r')
	words = f.read()
	f.close()
	
	f = open('muteDisplay.txt', 'r')
	muter = f.read()
	f.close()
	return muter + "||" + font + "||" + words

@app.route('/vetWords')
def vetWords():
	f = open('pendingWords.txt', 'r')
	words = f.readlines()
	print(words)
	f.close()
	f = open('words.txt', 'r')
	vettedWords = f.readlines()
	return render_template("vetWords.html", words = words, vettedWords = vettedWords)  

@app.route('/approve/<word>')
def approve(word):
	f = open('words.txt', 'a')
	f.write(word + "\n")
	f.close()
	with open('pendingWords.txt', 'r') as f:
		lines = f.readlines()
	with open('pendingWords.txt', 'w') as f:
		# Remove word from pendingWords that was approved
		for line in lines:
			print("Line: ", line.strip())
			print("word: ", word.strip())
			print("Evaluated: ", line.strip() != word.strip())
			if line.strip() != word.strip():
				print("adding", word, line.strip("\n"))
				f.write(line)
			else:
				print("Skipping: ", line)
	f = open('pendingWords.txt', 'r')
	words = f.read()
	f.close()
	if len(words) > 0:
		return words
	else:
		return ""

@app.route('/removeWord', methods = ["POST"])
def removeWord():
	word = request.form.get("word")
	f = open('pendingWords.txt', 'r')
	words = f.read()
	words = words.replace(word, " ")
	f = open('pendingWords.txt', 'w')
	f.write(words)
	f.close()
	return redirect(url_for('vetWords'))		


@app.route('/sendWord/<age>/<word>')
def sendWord(age, word):	
	f = open('pendingWords.txt', 'a')
	f.write(age + ": " + word.strip() + ":|: \n")
	f.close()
	return word

@app.route('/sendFont/<font>')
def sendFont(font):
	f = open('currentFont.txt', 'w')
	f.write(font)
	f.close()
	return font


def updateMuteState():
	states = {"true": "false",
						"false": "true",
						"": "true"}
	f = open('muteDisplay.txt', 'r')
	currentState = f.read()
	f = open('muteDisplay.txt', 'w')
	f.write(states[currentState])
	f.close()

@app.route('/muteDisplay')
def muteDisplay():
	updateMuteState()
	threading.Timer(20.0, updateMuteState).start()
	f = open('muteDisplay.txt', 'r')
	currentState = f.read()
	f.close()
	return currentState
