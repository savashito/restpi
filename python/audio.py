print "Meoww "
import termios, fcntl, sys, os

# fd = sys.stdin.fileno()

# oldterm = termios.tcgetattr(fd)
# newattr = termios.tcgetattr(fd)
# newattr[3] = newattr[3] & ~termios.ICANON & ~termios.ECHO
# termios.tcsetattr(fd, termios.TCSANOW, newattr)

# oldflags = fcntl.fcntl(fd, fcntl.F_GETFL)
# fcntl.fcntl(fd, fcntl.F_SETFL, oldflags | os.O_NONBLOCK)

print("playing song "+sys.argv[1])
# volume = 0
# try:
# 	while 1:
# 	    try:
# 	        c = sys.stdin.read(1)
# 	        if(c == '+' or c=='='):
# 	        	volume +=1
# 	        elif(c=='-'):
# 	        	volume -=1
# 	        print 'volume '+str(volume)
# 	        print "Got character", repr(c)
# 	    except IOError: pass
# finally:
#     termios.tcsetattr(fd, termios.TCSAFLUSH, oldterm)
#     fcntl.fcntl(fd, fcntl.F_SETFL, oldflags)

# while 1:
t = 3
c='f'
volume = 0
while c!='o':
	t-=1
	c = sys.stdin.read(1)

	if(c == '+' or c=='='):
 		volume +=1
 	elif(c=='-'):
 		volume -=1
	print 'volume '+str(volume)
# print "Got character", repr(c)
	# print '|'+c