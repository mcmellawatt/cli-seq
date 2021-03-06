/******************************************************************************
 * Copyright 2017 Ian Bertram Zieg
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

const midi = require("midi");
const colors = require("colors");
const Log = require("./../display/log-util");

class MidiDevice {

    static get devices() {
        return devices;
    }

    static listOutputPorts() {
        let output = new midi.output();
        let portCount = output.getPortCount();
        for (let i = 0; i < portCount; i++) {
            let portName = output.getPortName(i);
            Log.info(portName);
        }
    }

    static listInputPorts() {
        let input = new midi.input();
        let portCount = input.getPortCount();
        for (let i = 0; i < portCount; i++) {
            let portName = input.getPortName(i);
            Log.info(portName);
        }
    }

    static getInstance(deviceOptions) {

        for (let deviceKey of Object.keys(devices)) {
            let device = devices[deviceKey];
            if (device.names[0] === deviceOptions.names[0]) {
                if (!(device.instance instanceof MidiDevice)) {
                    device.instance = new MidiDevice(deviceOptions);
                    device.instance.open();
                }
                return device.instance;
            }
        }
    }

    get options() {
        return this._options;
    }

    get input() {
        return this._inputPort;
    }

    get inputStatus() {
        return this._inputPortStatus;
    }

    get output() {
        return this._outputPort;
    }

    get outputStatus() {
        return this._outputPortStatus;
    }

    constructor(options) {
        this._options = options;
    }

    open() {
        this.openInput();
        this.openOutput();
    }

    openInput() {
        let input = new midi.input();
        let foundPort = false;
        let port;
        let portCount = input.getPortCount();
        for (let i = 0; i < portCount; i++) {
            let portName = input.getPortName(i);
            if (this.options.names.indexOf(portName) >= 0) {
                port = input.openPort(i);
                foundPort = true;
                Log.success(`${portName}: Input port open`);
            }
        }

        if (!foundPort) {
            Log.error(`No Input MIDI Output devices found matching ${this.options.names}`);
        }
        this._inputPortStatus = foundPort;
        this._inputPort = input;

    }

    openOutput() {
        let output = new midi.output();
        let port;
        let portCount = output.getPortCount();
        let foundPort = false;
        for (let i = 0; i < portCount; i++) {
            let portName = output.getPortName(i);
            if (this.options.names.indexOf(portName) >= 0) {
                port = output.openPort(i);
                foundPort = true;
                Log.success(`${portName}: Output port open`);
            }
        }
        if (!foundPort) {
            Log.error(`No MIDI Output devices found matching ${this.options.names}`);

        }
        this._outputPortStatus = foundPort;
        this._outputPort = output;

    }

}
module.exports = MidiDevice;


let devices = {
    BeatStepPro: {
        names: [
            'Arturia BeatStep Pro Arturia BeatStepPro',
            'Arturia BeatStep Pro 20:0',
            'Arturia BeatStep Pro 24:0',
            'Arturia BeatStep Pro 28:0'],
        instance: null
    },
    Minilogue: {
        names: [
            'minilogue SOUND',
            'minilogue 24:1',
            'minilogue 28:1'
        ],
        instance: null
    },
    MOTU828x: {
        names: ['828x MIDI Port'],
        instance: null
    },
    Midisport: {
        names: [
            'USB Uno MIDI Interface 28:0',
            'USB Uno MIDI Interface 20:0'],
        instance: null
    }
};