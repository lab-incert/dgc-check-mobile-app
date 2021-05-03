
import { Test } from "./test";
import { Vaccination } from "./vaccination";
import { Recovery } from "./recovery";
import { Certificate } from "./certificate";
import { PersonName } from "./personName";

export class DGC {

    public ver: string;
    public nam: PersonName;
    public dob: string;

    public v: Vaccination[];
    public t: Test[];
    public r: Recovery[];
    //public cert: Certificate;

    constructor() {}

}