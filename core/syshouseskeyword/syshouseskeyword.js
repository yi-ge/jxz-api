/**
 * Created by NX on 2016/8/8.
 */
import syshouseskeyword from './syshouseskeyword.config';
import Base from './../base';

class SysHousesKeyword extends Base {
    constructor() {
        super("sys_houses_keyword", syshouseskeyword, {
            tableName: 'sys_houses_keyword'
        });
    }

    /**
     *
     * @param name
     * @param keyword_desc
     * @param picture 图片
     * @param creater 创建人
     * @param modifier 修改人
     * @returns {{id: number, name: *, keyword_desc: *, picture: *, creater: *, modifier: *, created_at: Date, updated_at: Date}}
     */
    createModel(name,keyword_desc,picture,creater,modifier){
        let model = {
            id:this.generateId(),
            name:name,
            keyword_desc:keyword_desc,
            picture:picture,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatSysHousesKeyword(keyword){
        !!keyword.created_at && (keyword.created_at = this.formatDate(keyword.created_at,'yyyy-MM-dd hh:mm:ss'));
        !!keyword.updated_at && (keyword.updated_at = this.formatDate(keyword.updated_at,'yyyy-MM-dd hh:mm:ss'));
        return keyword;
    }

}

export default new SysHousesKeyword();