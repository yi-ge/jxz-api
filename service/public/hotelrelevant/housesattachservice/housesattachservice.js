import {HousesAttach} from './../../../../core';
class HousesAttachService {
    /**
     * 批量添加附件
     * @param houses_id
     * @param attachs [title,links_url,file_path]
     * @param creater
     */
    addHousesAttachList(houses_id, attachs, creater) {
        return HousesAttach.addHousesAttachList(houses_id, attachs, creater);
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
    addHousesAttach(houses_id, title, links_url, creater, file_path) {
        return HousesAttach.transaction(t=> {
            return HousesAttach.insert(HousesAttach.createModel(houses_id, 1, title, links_url, creater, creater, file_path), {
                transaction: t
            });
        });
    }
}
export default new HousesAttachService();