import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';
import { FIELD } from "../contracts/Field";

export default function useFields(injectedProvider) {
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const loadFields = async () => {
            const signer = await injectedProvider.getSigner();
            const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer);

            const nrOfFields = await fieldManagerContract.nrOfFields();
            const fieldsFromContract = [];
            for (let fieldId = 0; fieldId < nrOfFields; fieldId++) {
                let fieldAddress = await fieldManagerContract.fields(fieldId);
                let fieldContract = new ethers.Contract(fieldAddress, FIELD.ABI, signer);

                let field = {};
                field.fieldId = fieldId;
                field.name = await fieldContract.name();
                field.symbol = await fieldContract.symbol();
                field.allowedContracts = await fieldContract.getAllowedContracts();

                fieldsFromContract.push(field);
            }
            debugger
            setFields(fieldsFromContract)
        }
        loadFields();
        // eslint-disable-next-line
    }, [injectedProvider]);

    return fields;
}