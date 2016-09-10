/**
 * Created by NX on 2016/8/8.
 */
import housescombo from './housescombo.config';
import Base from './../base';

class HousesCombo extends Base {
    constructor() {
        super("houses_combo", housescombo, {
            tableName: 'houses_combo'
        });
    }

    createModel(){
        let model = {
            id:this.generateId(),
        };
        return model;
    }

    formatHouserCombo(combo){
        return combo;
    }
}

export default new HousesCombo();