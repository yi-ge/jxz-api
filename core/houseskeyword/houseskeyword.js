/**
 * Created by NX on 2016/8/8.
 */
import houseskeyword from './houseskeyword.config';
import Base from './../base';

class HousesKeyword extends Base {
    constructor() {
        super("houses_keyword", houseskeyword, {
            tableName: 'houses_keyword'
        });
    }

    /**
     *
     * @param houses_id 酒店id
     * @param keyword_id 系统酒店关键词id
     * @param keyword_desc 酒店关键词描述
     * @param creater 创建人
     * @param modifier 修改人
     * @returns {{id: number, houses_id: *, keyword_id: *, keyword_desc: *, creater: *, modifier: *, created_at: Date, updated_at: Date}}
     */
    createModel(houses_id,keyword_id,keyword_desc,creater,modifier){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            keyword_id:keyword_id,
            keyword_desc:keyword_desc,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatHousesKeyword(keyword){
        return keyword;
    }
}

export default new HousesKeyword();