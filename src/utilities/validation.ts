
export interface Validation {
    value: string | number;
    required?: boolean;
    minLenght?: number;
    maxLenght?: number;
    min?: number;
    max?: number;
}

export function Validatable (validateInput: Validation) {
    let isValid = true;
    if(validateInput.required){
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if(validateInput.minLenght != null && typeof validateInput.value === 'string'){
        isValid = isValid && validateInput.value.length >= validateInput.minLenght
    }
    if(validateInput.maxLenght != null && typeof validateInput.value === 'string'){
        isValid = isValid && validateInput.value.length <= validateInput.maxLenght
    }
    if(validateInput.min != null && typeof validateInput.value === 'number'){
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if(validateInput.max != null && typeof validateInput.value === 'number'){
        isValid = isValid && validateInput.value <= validateInput.max;
    }
    return isValid;
}
