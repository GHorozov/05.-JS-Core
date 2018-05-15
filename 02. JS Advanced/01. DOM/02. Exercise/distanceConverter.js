function attachEventsListeners() {
    let button = document.getElementById('convert');
    button.addEventListener('click', convert);
    let inputBox = document.getElementById('inputDistance');
    let outputBox = document.getElementById('outputDistance');

    let inputUnits = document.getElementById('inputUnits');
    let outputUnits = document.getElementById('outputUnits');

    let result;
    function convert() {
        let inputNumber = Number(inputBox.value);
        let inputUnitText='';
        let inputUnitsToSwitch = inputUnits.value;

        switch (inputUnitsToSwitch){
            case 'km':
            switch(outputUnits.value){
                case 'km':
                    result = inputNumber;break;
                case 'm':
                    result = inputNumber * 1000;break;
                case 'cm':
                    result = inputNumber * 1000 * 100;break;
                case 'mm':
                    result = inputNumber * 1000 * 100 * 10;break;
                case 'mi':
                    result = inputNumber * 1000 / 1609.34;break;
                case 'yrd':
                    result = inputNumber * 1000 / 0.9144;break;
                case 'ft':
                    result = inputNumber * 1000 / 0.3048;break;
                case 'in':
                    result = inputNumber * 1000 / 0.0254;break;
            }break;
            case 'm':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber / 1000;break;
                    case 'm':
                        result = inputNumber;break;
                    case 'cm':
                        result = inputNumber * 100;break;
                    case 'mm':
                        result = inputNumber * 1000;break;
                    case 'mi':
                        result = inputNumber / 1609.34;break;
                    case 'yrd':
                        result = inputNumber / 0.9144;break;
                    case 'ft':
                        result = inputNumber / 0.3048;break;
                    case 'in':
                        result = inputNumber / 0.0254;break;
                }break;
            case 'cm':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber / 100 / 1000;break;
                    case 'm':
                        result = inputNumber / 100;break;
                    case 'cm':
                        result = inputNumber;break;
                    case 'mm':
                        result = inputNumber * 10;break;
                    case 'mi':
                        result = inputNumber / 100 / 1609.34;break;
                    case 'yrd':
                        result = inputNumber / 100 / 0.9144;break;
                    case 'ft':
                        result = inputNumber / 100 / 0.3048;break;
                    case 'in':
                        result = inputNumber / 100 / 0.0254;break;
                }break;
            case 'mm':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber * 0.001 / 1000;break;
                    case 'm':
                        result = inputNumber * 0.001;break;
                    case 'cm':
                        result = inputNumber / 10;break;
                    case 'mm':
                        result = inputNumber;break;
                    case 'mi':
                        result = inputNumber * 0.001 / 1609.34;break;
                    case 'yrd':
                        result = inputNumber * 0.001 / 0.9144;break;
                    case 'ft':
                        result = inputNumber * 0.001 / 0.3048;break;
                    case 'in':
                        result = inputNumber * 0.001 / 0.0254;break;
                }break;
            case 'mi':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber * 1609.34 / 1000;break;
                    case 'm':
                        result = inputNumber * 1609.34;break;
                    case 'cm':
                        result = inputNumber * 1609.34 * 100;break;
                    case 'mm':
                        result = inputNumber * 1609.34 * 1000;break;
                    case 'mi':
                        result = inputNumber;break;
                    case 'yrd':
                        result = inputNumber * 1609.34 / 0.9144;break;
                    case 'ft':
                        result = inputNumber * 1609.34 / 0.3048;break;
                    case 'in':
                        result = inputNumber * 1609.34 / 0.0254;break;
                }break;
            case 'yrd':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber * 0.9144 / 1000;break;
                    case 'm':
                        result = inputNumber * 0.9144;break;
                    case 'cm':
                        result = inputNumber * 0.9144 * 100;break;
                    case 'mm':
                        result = inputNumber * 0.9144 * 1000;break;
                    case 'mi':
                        result = inputNumber * 0.9144 / 1609.34;break;
                    case 'yrd':
                        result = inputNumber;break;
                    case 'ft':
                        result = inputNumber * 0.9144 / 0.3048;break;
                    case 'in':
                        result = inputNumber * 0.9144 / 0.0254;break;
                }break;
            case 'ft':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber * 0.3048 / 1000;break;
                    case 'm':
                        result = inputNumber * 0.3048;break;
                    case 'cm':
                        result = inputNumber * 0.3048 * 100;break;
                    case 'mm':
                        result = inputNumber * 0.3048 * 1000;break;
                    case 'mi':
                        result = inputNumber * 0.3048 / 1609.34;break;
                    case 'yrd':
                        result = inputNumber * 0.3048 / 0.9144;break;
                    case 'ft':
                        result = inputNumber;break;
                    case 'in':
                        result = inputNumber * 0.3048 / 0.0254;break;
                }break;
            case 'in':
                switch(outputUnits.value){
                    case 'km':
                        result = inputNumber * 0.0254 / 1000;break;
                    case 'm':
                        result = inputNumber * 0.0254;break;
                    case 'cm':
                        result = inputNumber * 0.0254 * 100;break;
                    case 'mm':
                        result = inputNumber * 0.0254 * 1000;break;
                    case 'mi':
                        result = inputNumber * 0.0254 / 1609.34;break;
                    case 'yrd':
                        result = inputNumber * 0.0254 / 0.9144;break;
                    case 'ft':
                        result = inputNumber * 0.0254 / 0.3048;break;
                    case 'in':
                        result = inputNumber;break;
                }break;
        }

        outputBox.value = result;
    }
}