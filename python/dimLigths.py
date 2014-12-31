#!/usr/bin/env python2.7
# script by Alex Eames http://RasPi.tv
#http://RasPi.tv/2013/how-to-use-soft-pwm-in-rpi-gpio-pt-2-led-dimming-and-motor-speed-control
# Using PWM with RPi.GPIO pt 2 - requires RPi.GPIO 0.5.2a or higher

import RPi.GPIO as GPIO # always needed with RPi.GPIO
from time import sleep  # pull in the sleep function from time module

GPIO.setmode(GPIO.BCM)  # choose BCM or BOARD numbering schemes. I use BCM

# GPIO.setup(25, GPIO.OUT)# set GPIO 25 as output for white led
# GPIO.setup(24, GPIO.OUT)# set GPIO 24 as output for red led

# white = GPIO.PWM(25, 100)    # create object white for PWM on port 25 at 100 Hertz
# red = GPIO.PWM(24, 100)      # create object red for PWM on port 24 at 100 Hertz

# white.start(0)              # start white led on 0 percent duty cycle (off)
# red.start(100)              # red fully on (100%)

# # now the fun starts, we'll vary the duty cycle to 
# # dim/brighten the leds, so one is bright while the other is dim

# pause_time = 0.02           # you can change this to slow down/speed up

# led red 30 blue 50
# command = {exit:}
import math
print "running dimLigths.py"

try:
	c = 'f'
	while c!='o':
		x = raw_input('Type a commang ->')
		arr = x.split()
		print 'got cmd "'+x+'"'
		if(len(arr)<1):
			print "error! Empty string"
		else:
			if(arr[0]=='led'):
				animationSpeed = int(arr[1])
				n = (len(arr)-2)/3 # number of commands in the queue
				totalSteps = 50.0 # this is the resolution :)
				stepSize={}
				ledGPIOArr = {}
				leds = []
				pause_time = animationSpeed/totalSteps
				currentVal = {}
				# FIll the array with the correct data to animate
				for i in range(0,n):
					ledPin 		= int(arr[i*3+2])
					startValue 	= int(arr[i*3+3])
					ledFinalVal = int(arr[i*3+4])
					leds.append(ledPin)
					ledGPIO= None # ledGPIOArr[ledPin]
					stepSize[ledPin] = (ledFinalVal-startValue)/totalSteps
					if(ledGPIO==None):
						GPIO.setup(ledPin, GPIO.OUT)
				 		ledGPIO = GPIO.PWM(ledPin, 100) # set to 100 hz
						ledGPIO.start(startValue)
						ledGPIOArr[ledPin] = ledGPIO
					currentVal[ledPin] = startValue
				# move the led to final value
				# startValue = prevValues[ledPin]
				# dist = ledFinalVal -startValue;
				# for i in range(startValue,ledFinalVal,int(math.copysign(1, dist))):
				# 	print i
				# ignore everything, here is your scrap!
				# we need an array with the step size for each led
				for i in range(0,int(totalSteps)):
					# update each led
					for led in leds:
						# Extract the current step size for LED
						step = stepSize[led]

						# current = currentVal[led]
						currentVal[led] += step
						# Animate each led 
						# ledGPIO[led].ChangeDutyCycle(current + step)
						# print str(led) +' '+str(step)+' val: '+str(currentVal[led])
						ledGPIOArr[ledPin].ChangeDutyCycle(int(currentVal[led]))
					sleep(pause_time)
				# update previous value
				# prevValues[ledPin] = ledFinalVal
			elif(arr[0]=='temp'):
				print '35.4';
			elif(arr[0]=='spectra'):
				print '35.4';
			elif(arr[0]=='exit'):
				c='o'
				print "sel"
			else:
				print "error! Not defined"

		#c = command[arr[0]](arr);
		# print 'you typed '+

        # for i in range(0,101):      # 101 because it stops when it finishes 100
        #     white.ChangeDutyCycle(i)
        #     red.ChangeDutyCycle(100 - i)
        #     sleep(pause_time)
        # for i in range(100,-1,-1):      # from 100 to zero in steps of -1
        #     white.ChangeDutyCycle(i)
        #     red.ChangeDutyCycle(100 - i)
        #     sleep(pause_time)

except KeyboardInterrupt:
	print "byeee"
    # white.stop()            # stop the white PWM output
    # red.stop()              # stop the red PWM output
    # GPIO.cleanup()          # clean up GPIO on CTRL+C exit


