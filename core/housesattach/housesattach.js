/**
 * Created by NX on 2016/8/8.
 */
import housesattach from './housesattach.config';
import Base from './../base';

class HousesAttach extends Base {
    constructor() {
        super("houses_attach", housesattach, {
            tableName: 'houses_attach'
        });
    }

    createModel(houses_id,type,title,links_url,creater,modifier,file_path){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            type:type,
            title:title,
            links_url:links_url,
            creater:creater,
            modifier:modifier,
            file_path:file_path,
            created_at:new Date(),
            updated_at:new Date()
        };
        return model;
    }

    formatHousesAttach(attach){
        !!attach.created_at && (attach.created_at = this.formatDate(attach.created_at,'yyyy-MM-dd hh:mm:ss'));
        !!attach.updated_at && (attach.updated_at = this.formatDate(attach.updated_at,'yyyy-MM-dd hh:mm:ss'));
        return attach;
    }

    /**
     * 批量添加附件
     * @param houses_id
     * @param attachs
     * @param creater
     * @returns {*}
     */
    addHousesAttachList(houses_id, attachs, creater){
        let insertList = [];
        if (Array.isArray(attachs)) {
            attachs.map(attach=> {
                console.log(attach);
                insertList.push(this.createModel(houses_id, 1, attach.title, attach.links_url, creater, creater, attach.file_path));
            });
        }else{
            insertList.push(this.createModel(houses_id, 1, attachs.title, attachs.links_url, creater, creater, attachs.file_path));
        }
        return this.transaction(t=> {
            return this.bulkCreate(insertList, {
                transaction: t
            });
        });
    }
}

export default new HousesAttach();