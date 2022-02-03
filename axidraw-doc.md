```bash
Interactive mode is a mode of use, designed for plotting individual motion
segments upon request. It is a complement to the usual plotting modes, which
take an SVG document as input.

So long as the AxiDraw is started in the home corner, moves are limit checked,
and constrained to be within the safe travel range of the AxiDraw.

Recommended usage:

ad = axidraw.AxiDraw() # Initialize class
ad.interactive() # Enter interactive mode

[Optional: Apply custom settings]

ad.connect() # Open serial port to AxiDraw

[One or more motion commands]
[Optional: Update settings, followed by calling update().]

ad.disconnect() # Close connection to AxiDraw

The motion commands are as follows:

goto(x,y) # Absolute XY move to new location
moveto(x,y) # Absolute XY pen-up move. Lift pen before moving, if it is down.
lineto(x,y) # Absolute XY pen-down move. Lower pen before moving, if it is up.

go(x,y) # XY relative move.
move(x,y) # XY relative pen-up move. Lift pen before moving, if it is down.
line(x,y) # XY relative pen-down move. Lower pen before moving, if it is up.

penup() # lift pen
pendown() # lower pen

Utility commands:

interactive() # Enter interactive mode
connect() # Open serial connection to AxiDraw. Returns True if connected successfully.
update() # Apply changes to options
disable() # Disable XY motors, for example to manually move carriage to home position.
disconnect() # Terminate serial session to AxiDraw. (Required.)

The available options are as follows:

options.speed_pendown # Range: 1-110 (percent).
options.speed_penup # Range: 1-110 (percent).
options.accel # Range: 1-100 (percent).
options.pen_pos_down # Range: 0-100 (percent).
options.pen_pos_up # Range: 0-100 (percent).
options.pen_rate_lower # Range: 1-100 (percent).
options.pen_rate_raise # Range: 1-100 (percent).
options.pen_delay_down # Range: -500 - 500 (ms).
options.pen_delay_up # Range: -500 - 500 (ms).
options.const_speed # True or False. Default: False
options.units # Range: 0-1. 0: Inches (default), 1: cm
options.model # Range: 1-3. 1: AxiDraw V2 or V3 ( Default) # 2: AxiDraw V3/A3 # 3: AxiDraw V3 XLX
options.port # String: Port name or USB nickname
options.port_config # Range: 0-1. 0: Plot to first unit found, unless port specified. (Default) # 1: Plot to first unit found

One or more options can be set after the interactive() call, and before connect()
for example as:

ad.options.speed_pendown = 75

All options except port and port_config can be changed after connect(). However,
you must call update() after changing the options and before calling any
additional motion commands.
```
