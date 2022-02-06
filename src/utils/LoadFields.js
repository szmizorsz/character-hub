import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';
import { FIELD } from "../contracts/Field";

export default async function loadFields(injectedProvider, setFields) {
    const signer = await injectedProvider.getSigner();
    const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer);

    const nrOfFields = await fieldManagerContract.nrOfFields();
    const fieldsFromContract = [];
    for (let fieldId = 0; fieldId < nrOfFields; fieldId++) {
        let fieldAddress = await fieldManagerContract.fields(fieldId);
        let fieldContract = new ethers.Contract(fieldAddress, FIELD.ABI, signer);

        let field = {};
        field.address = fieldAddress;
        field.fieldId = fieldId;
        field.name = await fieldContract.name();
        field.symbol = await fieldContract.symbol();
        field.allowedContracts = await fieldContract.getAllowedContracts();
        debugger
        fieldsFromContract.push(field);
    }
    debugger
    setFields(fieldsFromContract)
}


