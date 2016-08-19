/**
 * Created by NX on 2016/8/8.
 */
import houseskeyword from './houseskeyword.config';
import Base from './../base';
import SysHousesKeyword from './../syshouseskeyword/syshouseskeyword';
import SysUsers from './../sysusers/sysusers';

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
        !!keyword.created_at && (keyword.created_at = this.formatDate(keyword.created_at, 'yyyy-MM-dd hh:mm:ss'));
        !!keyword.updated_at && (keyword.updated_at = this.formatDate(keyword.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        return keyword;
    }

    findById(id,option){
        return super.findById(id,Object.assign({
            include:[{
                model:SysHousesKeyword.sequlize,
            },{
                model:SysUsers.sequlize,
                attribute:['id','user_name'],
                as:'creater_user'
            },{
                model:SysUsers.sequlize,
                attribute:['id','user_name'],
                as:'modifier_user'
            }]
        },option));
    }
    /**
     * 批量添加酒店关键词
     * @param houses_id
     * @param keywords [keyword_id,keyword_desc]
     * @param creater
     * @returns {*}
     */
    addHousesKeywordList(houses_id, keywords, creater){
        let insertList = [];
        console.log(keywords);
        if (Array.isArray(keywords)) {
            keywords.map(keyword => {
                keyword = JSON.parse(keyword);
                insertList.push(this.createModel(houses_id, keyword.keyword_id, keyword.keyword_desc, creater, creater));
            });
        }else{
            keywords = JSON.parse(keywords);
            insertList.push(this.createModel(houses_id, keywords.keyword_id, keywords.keyword_desc, creater, creater));
        }
        return this.transaction(t=> {
            return this.bulkCreate(insertList, {
                transaction: t,
            });
        });
    }
}

export default new HousesKeyword();