from flask import Flask, render_template, request, redirect, url_for
import threading, time, json

app = Flask(__name__)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/Period')
def Period():
    images = json.load(open('static/period_room/image_details.py', 'rb'))
    return render_template("Period.html",images=images)

# PAGE ROUTES
@app.route('/Fee/young')
def FeeYoung():
    return render_template("Fee.html", age = "young")

@app.route('/Fee/old')
def FeeOld():
	return render_template("Fee.html", age = "old")

@app.route('/Fee/add')
def FeeAdd():
	f = open('currentFont.txt', 'r')
	font = f.readline()
	f.close()
	return render_template("FeeAdd.html", font = font)

@app.route('/Fee/text/old')
def FeeTextOld():
	return render_template("FeeTextOld.html")

@app.route('/Fee/text/young')
def FeeTextYoung():
	return render_template("FeeTextYoung.html")

@app.route("/Tanner")
def Tanner():
	return render_template('Tanner.html')


@app.route("/Stephenson")
def Stephenson():
	import glob
	imgs = glob.glob("static/image_rotator/*.jpg")
	return render_template('Stephenson.html', imgs = imgs)

@app.route("/Stephenson/text")
def imageRotatorText():
	import json	
	f = open("allImagesText.txt")
	allLines = f.read()
	f.close()
	print(json.loads(allLines))
	return render_template('StephensonText.html', allLines = json.loads(allLines))

@app.route('/introduction')
def introduction():
	return render_template("introduction.html")

@app.route('/Frost')
def Frost():
	return render_template("Frost.html")

@app.route('/Stewart')
def Stewart():
	return render_template("Stewart.html")

@app.route('/HutchShinFairWeather')
def HutchShinFairWeather():
	return render_template("HutchShinFairWeather.html")

@app.route('/HutchShinFairWeather/video')
def HutchShinFairWeatherVideo():
	return render_template("HutchShinFairWeatherVideo.html")


@app.route('/vetWords')
def vetWords():
	f = open('pendingWords.txt', 'r')
	words = f.readlines()
	print(words)
	f.close()
	f = open('words.txt', 'r')
	vettedWords = f.readlines()
	return render_template("vetWords.html", words = words, vettedWords = vettedWords)

# AJAX ROUTES
@app.route("/setImageRotator/<imgPath>")
def setImageRotator(imgPath):
	f = open("currentImageRotator.txt", "w")
	f.write(imgPath)
	f.close()
	print(imgPath)
	return "success"


@app.route("/getImageRotatorText")
def getImageRotatorText():
	f = open("currentImageRotator.txt", 'r')
	currentImg = f.read()
	f.close()
	return currentImg

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

@app.route('/getFont')
def getFont():
	f = open('currentFont.txt', 'r')
	font = f.read()
	print(font)
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
