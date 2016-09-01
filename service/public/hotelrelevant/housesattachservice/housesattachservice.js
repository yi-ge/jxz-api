import {HousesAttach} from './../../../../core';
class HousesAttachService {
    /**
     * 批量添加附件
     * @param houses_id
     * @param attachs [title,links_url,file_path]
     * @param creater
     */
    addHousesAttachList(houses_id, attachs, creater) {
        return HousesAttach.transaction(t=> {
            return HousesAttach.addHousesAttachList(houses_id, attachs, creater, HousesAttach.TYPE.PICTURE, t);
        });
    }

    /**
     * 添加指定酒店附件
     * @param houses_id
     * @param title
     * @param links_url
     * @param creater
     * @param file_path
     * @returns {*}
     */
    addHousesAttach(houses_id, title, links_url, file_path, creater) {
        return HousesAttach.transaction(t=> {
            return HousesAttach.insert(HousesAttach.createModel(houses_id, HousesAttach.TYPE.PICTURE, title, links_url, creater, creater, file_path), {
                transaction: t
            });
        });
    }

    /**
     * 查询酒店附件
     * @param id
     * @returns {*|Promise.<T>}
     */
    findHouseAttach(houses_id) {
        return HousesAttach.findList({
            where: {
                houses_id: houses_id
            }
        }).then(result=> {
            result.list.map(attach=> {
                HousesAttach.formatHousesAttach(attach);
            });
            return result;
        });
    }

    /**
     * 删除附件
     * @param id
     * @returns {*}
     */
    destroyHouseAttach(id) {
        return HousesAttach.transaction(t=> {
            return HousesAttach.destroy({where: {id: id}, transaction: t});
        });
    }

    /**
     * 查询酒店附件
     * @param houses_id
     * @returns {*}
     */
    findHousesAttach(houses_id){
        return HousesAttach.findList({
            houses_id:houses_id,
            attributes:['id','type','links_url'],
            order:`id DESC`
        })
    }
}
export default new HousesAttachService();