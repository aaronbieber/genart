# Makefile for deploying the Sketch Gallery

OPTS=-rovWz --delete
EXCLUDE=--exclude '.git*' --exclude '.*' --exclude '\#*\#' --exclude Makefile
SRC=./public/
DEST=airborne@aaronbieber.com:/var/www/aaronbieber.com/htdocs/genart/

build:
	hugo --environment production --cleanDestinationDir

deploy: build
	rsync $(OPTS) $(EXCLUDE) $(SRC) $(DEST)

timestamp := $(shell date +%Y-%m-%d_%H%M)
sketch:
	echo "Creating sketch$(timestamp)..."
	echo "---\ntitle: Sketch $(timestamp)\nbasename: sketch$(timestamp)\ndate: `date +%Y-%m-%d`\n---" \
		> content/sketches/sketch$(timestamp).md
	touch content/sketches/sketch$(timestamp).js
