# Makefile for deploying the Sketch Gallery

OPTS=-rovWz --delete
EXCLUDE=--exclude '.git*' --exclude '.*' --exclude '\#*\#' --exclude Makefile
SRC=./public/
DEST=airborne@aaronbieber.com:/var/www/aaronbieber.com/htdocs/genart/

build:
	hugo --environment production --cleanDestinationDir

deploy: build
	rsync $(OPTS) $(EXCLUDE) $(SRC) $(DEST)