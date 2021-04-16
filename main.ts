let newX: number;
let newY: number;
let lastX: number;
let lastY: number;
let neutralX: number;
let neutralY: number;
let buf: Buffer;

let JoyStick_P = DigitalPin.P8;
let JoyStick_X = AnalogPin.P1;
let JoyStick_Y = AnalogPin.P2;
let KEY_A = DigitalPin.P5;
let KEY_B = DigitalPin.P11;
let KEY_C = DigitalPin.P15;
let KEY_D = DigitalPin.P14;
let KEY_E = DigitalPin.P13;
let KEY_F = DigitalPin.P12;

pins.setPull(JoyStick_P, PinPullMode.PullUp);
pins.setPull(KEY_A, PinPullMode.PullUp);
pins.setPull(KEY_B, PinPullMode.PullUp);
pins.setPull(KEY_C, PinPullMode.PullUp);
pins.setPull(KEY_D, PinPullMode.PullUp);
pins.setPull(KEY_E, PinPullMode.PullUp);
pins.setPull(KEY_F, PinPullMode.PullUp);

neutralX = pins.analogReadPin(JoyStick_X);
neutralY = pins.analogReadPin(JoyStick_Y);
radio.setGroup(19)

// music.setVolume(16)
// pins.onPulsed(JoyStick_P, PulseValue.Low, () => {
//     music.playTone(Note.C, 200)
// });

basic.forever(function () {
    basic.pause(100)
    newX = pins.analogReadPin(JoyStick_X);
    newY = pins.analogReadPin(JoyStick_Y);
    
    if (Math.abs(newX - lastX) > 2 || Math.abs(newY - lastY) > 2)
    {
        // encode data in buffer
        buf = pins.createBuffer(4)
        buf.setNumber(NumberFormat.Int16LE, 0, newX)
        buf.setNumber(NumberFormat.Int16LE, 2, newY)
        radio.sendBuffer(buf)

        lastX = newX;
        lastY = newY;
    }
    led.plotBarGraph(newY, 1023)
})

// radio.onReceivedBuffer(function (receivedBuffer) {
//
//     ax = receivedBuffer.getNumber(NumberFormat.Int16LE, 0);
//     ay = receivedBuffer.getNumber(NumberFormat.Int16LE, 2);

//
//     basic.clearScreen()
//     led.plot(
//         pins.map(ax, -1023, 1023, 0, 4),
//         pins.map(ay, -1023, 1023, 0, 4)
//     )
// });
