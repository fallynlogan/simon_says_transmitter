/**
 * Set all of our variables up with their cooresponding values and calibrate to get baseline reading
 * 
 * and sets radio group
 */
/**
 * We will need to get a base reading of our pin values so that Microbit can detect waht the baseline reading of our sensor is without being touched
 */
/**
 * This function checks to see if the capactitive touch sensor has been touched or not
 */
/**
 * When simon does any of the following gestures a number will be sent to the follower Microbit & an icon will appear letting Simon know which gesture they have performed
 */
function readPin1 () {
    reading1 += pins.analogReadPin(AnalogPin.P1)
    pins.digitalWritePin(DigitalPin.P1, 1)
}
/**
 * If any of these are true, it means that we have touched our capacitive sensor and will set the cooresponding state to true
 */
// THIS CODE IS FOR SIMON
// 
// state1 =
// 
// 
// state1 = calibration_value + threshold < reading1 / 1.1 / samples
// state0 = calibration_value + threshold < reading2 / 1.1 / samples
function sense () {
    reading0 = 0
    reading1 = 0
    reading2 = 0
    for (let index3 = 0; index3 <= samples; index3++) {
        readPin0()
        readPin1()
        readPin2()
        basic.pause(1)
    }
    state0 = calibration_value0 + threshold < reading0 / 1.1 / samples
    state1 = calibration_value1 + threshold < reading1 / 1.1 / samples
    state2 = calibration_value2 + threshold < reading2 / 1.1 / samples
}
function calibrate () {
    reading0 = 0
    for (let index2 = 0; index2 <= samples; index2++) {
        readPin0()
        readPin1()
        readPin2()
        basic.pause(1)
    }
    calibration_value0 = reading0 / samples
    calibration_value1 = reading1 / samples
    calibration_value2 = reading2 / samples
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(7)
    basic.showString("A")
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.FreeFall, function () {
    radio.setGroup(6)
    basic.showString("F")
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.TiltLeft, function () {
    radio.sendNumber(3)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.ScreenDown, function () {
    radio.sendNumber(5)
    basic.showString("D")
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(9)
    basic.showString("A+B")
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(8)
    basic.showString("B")
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(1)
    basic.showIcon(IconNames.Chessboard)
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.TiltRight, function () {
    radio.sendNumber(4)
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.LogoDown, function () {
    radio.sendNumber(2)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
})
function readPin2 () {
    reading2 += pins.analogReadPin(AnalogPin.P2)
    pins.digitalWritePin(DigitalPin.P2, 1)
}
/**
 * Reads in each of the pin reading values and sets the reading of that cooresponding pin to the value
 */
function readPin0 () {
    reading0 += pins.analogReadPin(AnalogPin.P0)
    pins.digitalWritePin(DigitalPin.P0, 1)
}
let sensing = false
let calibration_value2 = 0
let calibration_value1 = 0
let reading2 = 0
let reading0 = 0
let reading1 = 0
let calibration_value0 = 0
let state2 = false
let state1 = false
let state0 = false
let samples = 0
let threshold = 0
let index = 0
threshold = 2
pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
samples = 8
state0 = false
state1 = false
state2 = false
calibration_value0 = 0
calibrate()
basic.showString("SIMON SAYS")
radio.setGroup(1)
/**
 * Continuosly checks if any of the capacitive touch sensors have been touched, if so sends a number to the follower Microbit
 */
basic.forever(function () {
    sensing = true
    while (sensing) {
        sense()
        if (state0) {
            basic.showIcon(IconNames.Heart)
            radio.sendNumber(10)
            basic.pause(500)
            basic.clearScreen()
        }
        if (state1) {
            basic.showIcon(IconNames.Heart)
            radio.sendNumber(11)
            basic.pause(500)
            basic.clearScreen()
        }
        if (state2) {
            basic.showIcon(IconNames.Heart)
            radio.sendNumber(12)
            basic.pause(500)
            basic.clearScreen()
        }
    }
})
