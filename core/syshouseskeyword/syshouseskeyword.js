/**
 * Created by NX on 2016/8/8.
 */
import syshouseskeyword from './syshouseskeyword.config';
import Base from './../base';
import SysUsers from './../sysusers/sysusers';

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
    createModel(name, keyword_desc, picture, creater, modifier) {
        let model = {
            id: this.generateId(),
            name: name,
            keyword_desc: keyword_desc,
            picture: picture,
            creater: creater,
            modifier: modifier,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return model;
    }

    formatSysHousesKeyword(keyword) {
        !!keyword.created_at && (keyword.created_at = this.formatDate(keyword.created_at, 'yyyy-MM-dd hh:mm:ss'));
        !!keyword.updated_at && (keyword.updated_at = this.formatDate(keyword.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        return keyword;
    }

    findById(id,option){
        return super.findById(id, Object.assign({
            include: [{
                model: SysUsers.sequlize,
                attributes: ['id', 'user_name'],
                as: 'creater_user'
            }, {
                model: SysUsers.sequlize,
                attributes: ['id', 'user_name'],
                as: 'modifier_user'
            }]
        },option));
    }

    findPage(option, page, count, sortType = 2, pagesize = 20){
        return super.findPage(Object.assign({
            order: `updated_at DESC`,
            include: [{
                model: SysUsers.sequlize,
                attributes: ['id', 'user_name'],
                as: 'creater_user'
            }, {
                model: SysUsers.sequlize,
                attributes: ['id', 'user_name'],
                as: 'modifier_user'
            }]
        },option), page, count,sortType , pagesize)
    }
}

export default new SysHousesKeyword();