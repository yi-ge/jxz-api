/**
 * Created by NX on 2016/8/8.
 */
import SysUsersService from './sysusersservice';
import SysHousesKeywordService from './syshouseskeywordservice';

import {
    ResourceService,
    RolesService,
    UserRolesService,
    RoleResourcesService,
} from './rolesrelevant'

import {
    HousesService,
    HousesKeywordService,
    HousesAttachService,
    HousesCommentService,
    UsersService,
    VipService,
    ArticlesService,
    RegionService,
    SysHotKeywordService,
} from './../public';


export {
    SysUsersService,
    ResourceService, //权限管理
    RolesService, //角色管理
    UserRolesService,//用户角色中间表
    RoleResourcesService,//角色权限中间表
    SysHousesKeywordService,
    SysHotKeywordService,//系统热词
    UsersService,
    VipService,
    ArticlesService,
    RegionService,
    HousesService,
    HousesKeywordService,
    HousesAttachService,
    HousesCommentService,
}