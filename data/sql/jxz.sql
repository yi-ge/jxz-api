/*
SQLyog Ultimate v11.13 (64 bit)
MySQL - 5.6.30-log : Database - jxz
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jxz` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `jxz`;

/*Table structure for table `activitys` */

DROP TABLE IF EXISTS `activitys`;

CREATE TABLE `activitys` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `activity_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '活动类型',
  `activity_banner` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '活动banner',
  `activity_title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '活动标题',
  `activity_begin_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '活动开始时间',
  `activity_end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '活动结束时间',
  `apply_begin_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '报名开始时间',
  `apply_end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '报名结束时间',
  `activity_desc` varchar(510) COLLATE utf8_bin DEFAULT NULL COMMENT '活动描述',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `link_url` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '连接URL',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态0无效1有效',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='活动';

/*Data for the table `activitys` */

/*Table structure for table `activitys_apply` */

DROP TABLE IF EXISTS `activitys_apply`;

CREATE TABLE `activitys_apply` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `activity_id` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '活动类型',
  `user_name` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `phone` bigint(20) DEFAULT NULL COMMENT '手机',
  `email` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT 'mail',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='活动-申请报名';

/*Data for the table `activitys_apply` */

/*Table structure for table `activitys_location` */

DROP TABLE IF EXISTS `activitys_location`;

CREATE TABLE `activitys_location` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `activitys_id` bigint(20) DEFAULT NULL COMMENT '活动id',
  `location` tinyint(4) DEFAULT NULL COMMENT '活动位置   0：普通活动，1：首页弹出活动位，2：首页banner1，3：首页banner2，4：特色活动位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='活动位置';

/*Data for the table `activitys_location` */

/*Table structure for table `article_category` */

DROP TABLE IF EXISTS `article_category`;

CREATE TABLE `article_category` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `name` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `picture` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文章分类';

/*Data for the table `article_category` */

/*Table structure for table `articles` */

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `category_id` bigint(20) DEFAULT NULL COMMENT '分类id',
  `title` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8_bin COMMENT '内容',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '对应房屋id',
  `author_type` tinyint(4) DEFAULT NULL COMMENT '作者类型1前端用户2后台用户',
  `author` bigint(20) DEFAULT NULL COMMENT '作者',
  `check_status` tinyint(4) DEFAULT NULL COMMENT '审核状态1通过2拒绝',
  `check_cause` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '审核原因',
  `check_user_id` bigint(20) DEFAULT NULL COMMENT '审核人',
  `check_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '审核时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `is_off` tinyint(4) DEFAULT NULL COMMENT '是否离线0离线1上线',
  `read_num` int(11) DEFAULT NULL COMMENT '阅读数量',
  `cover_picture` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '封面图片',
  `at_num` int(11) DEFAULT NULL COMMENT '关注数',
  `like_num` int(11) DEFAULT NULL COMMENT '点赞数',
  `is_draft` tinyint(4) DEFAULT NULL COMMENT '是否草稿',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文章';

/*Data for the table `articles` */

/*Table structure for table `articles_comment` */

DROP TABLE IF EXISTS `articles_comment`;

CREATE TABLE `articles_comment` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `articles_id` bigint(20) DEFAULT NULL COMMENT '文章id',
  `comment_user_id` bigint(20) DEFAULT NULL COMMENT '评论人',
  `content` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '评论内容',
  `comment_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '评论时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文章-评论';

/*Data for the table `articles_comment` */

/*Table structure for table `audit_edit_log` */

DROP TABLE IF EXISTS `audit_edit_log`;

CREATE TABLE `audit_edit_log` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `event_type` tinyint(4) DEFAULT NULL COMMENT '修改类型,1:添加,2:修改3:删除',
  `event_module` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '事件模块',
  `event_content` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件内容',
  `event_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '事件时间',
  `eventer` bigint(20) DEFAULT NULL COMMENT '事件人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='审计-编辑日志';

/*Data for the table `audit_edit_log` */

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `goods_type` tinyint(4) DEFAULT NULL COMMENT '商品类型1积分商品',
  `goods_name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '商品名',
  `goods_desc` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT '商品描述',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `need_integral` int(11) DEFAULT NULL COMMENT '需要积分',
  `stock_num` int(11) DEFAULT NULL COMMENT '库存数量',
  `stock_lock_num` int(11) DEFAULT NULL COMMENT '库存锁住数量',
  `sell_num` int(11) DEFAULT NULL COMMENT '销售数量',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态 1有效0无效3锁住',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `picture` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `picture2` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `picture3` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `picture4` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `picture5` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `picture6` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='商品';

/*Data for the table `goods` */

/*Table structure for table `houses` */

DROP TABLE IF EXISTS `houses`;

CREATE TABLE `houses` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型1酒店',
  `name` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '楼盘名称',
  `nation` bigint(20) DEFAULT NULL COMMENT '楼盘国家',
  `region` bigint(20) DEFAULT NULL COMMENT '区域,引用字典',
  `city` bigint(20) DEFAULT NULL COMMENT '城市',
  `orientation` bigint(20) DEFAULT NULL COMMENT '方位,引用字典',
  `picture` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '房屋主图',
  `address` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '地址',
  `longitude` decimal(10,6) DEFAULT NULL COMMENT '经度',
  `latitude` decimal(10,6) DEFAULT NULL COMMENT '纬度',
  `favorite_nums` int(11) DEFAULT NULL COMMENT '收藏数',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `is_putaway` tinyint(4) DEFAULT NULL COMMENT '是否上架0未上架1上架',
  `spots_around` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '周边景色',
  `traffic_around` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '周边交通',
  `houses_desc` varchar(510) COLLATE utf8_bin DEFAULT NULL COMMENT '房屋介绍',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  `comment_num` mediumint(9) DEFAULT NULL COMMENT '评论数',
  `is_orders` tinyint(4) DEFAULT NULL COMMENT '是否可预约0不能1能',
  `article_num` mediumint(9) DEFAULT NULL COMMENT '文章数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋';

/*Data for the table `houses` */

/*Table structure for table `houses_attach` */

DROP TABLE IF EXISTS `houses_attach`;

CREATE TABLE `houses_attach` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋id',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型(1图片,2视频)',
  `file_path` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '文件路径',
  `title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `links_url` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '连接url',
  `show_location` tinyint(4) DEFAULT NULL COMMENT '显示地点1封面',
  `sort_order` smallint(6) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-附件';

/*Data for the table `houses_attach` */

/*Table structure for table `houses_combo` */

DROP TABLE IF EXISTS `houses_combo`;

CREATE TABLE `houses_combo` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋ID',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '套餐名字',
  `combo_begin_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '套餐开始时间',
  `combo_desc` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT '套餐描述',
  `combo_end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '套餐结束时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启用',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-套餐';

/*Data for the table `houses_combo` */

/*Table structure for table `houses_comment` */

DROP TABLE IF EXISTS `houses_comment`;

CREATE TABLE `houses_comment` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋ID',
  `comment_source` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '评论来源',
  `content` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '评论内容',
  `comment_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '评论时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-评论';

/*Data for the table `houses_comment` */

/*Table structure for table `houses_keyword` */

DROP TABLE IF EXISTS `houses_keyword`;

CREATE TABLE `houses_keyword` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '楼盘id',
  `keyword_id` bigint(20) DEFAULT NULL COMMENT '关键词',
  `keyword_desc` varchar(120) COLLATE utf8_bin DEFAULT NULL COMMENT '关键词描述',
  `sort_order` int(11) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-关键词\r\n';

/*Data for the table `houses_keyword` */

/*Table structure for table `houses_room` */

DROP TABLE IF EXISTS `houses_room`;

CREATE TABLE `houses_room` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋ID',
  `houses_type` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '房型',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-房间';

/*Data for the table `houses_room` */

/*Table structure for table `houses_room_price` */

DROP TABLE IF EXISTS `houses_room_price`;

CREATE TABLE `houses_room_price` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋ID',
  `houses_room_id` bigint(20) DEFAULT NULL COMMENT '房屋房间ID',
  `season` tinyint(4) DEFAULT NULL COMMENT '季节1淡季2旺季3高峰',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `price_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '价格描述',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-房间价格';

/*Data for the table `houses_room_price` */

/*Table structure for table `houses_solar_terms` */

DROP TABLE IF EXISTS `houses_solar_terms`;

CREATE TABLE `houses_solar_terms` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋ID',
  `season` tinyint(4) DEFAULT NULL COMMENT '季节1淡季2旺季3高峰',
  `name` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '节气名称',
  `solar_terms_begin_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '节气开始时间',
  `solar_terms_end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '节气结束时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  `is_set_price` tinyint(4) DEFAULT NULL COMMENT '是否设置了价格1设置了价格0暂无价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-节气';

/*Data for the table `houses_solar_terms` */

/*Table structure for table `links` */

DROP TABLE IF EXISTS `links`;

CREATE TABLE `links` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型(1图片,2视频)',
  `file_path` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '文件路径',
  `title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `links_url` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '连接url',
  `sort_order` smallint(6) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='连接，广告，首页banner';

/*Data for the table `links` */

/*Table structure for table `links_location` */

DROP TABLE IF EXISTS `links_location`;

CREATE TABLE `links_location` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `links_id` bigint(20) DEFAULT NULL COMMENT '广告id',
  `location` bigint(20) DEFAULT NULL COMMENT '位置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='广告位置';

/*Data for the table `links_location` */

/*Table structure for table `order_goods` */

DROP TABLE IF EXISTS `order_goods`;

CREATE TABLE `order_goods` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `activity_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '活动名字',
  `order_user_id` bigint(20) DEFAULT NULL COMMENT '订单用户id',
  `weixin_id` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '微信id',
  `goods_id` bigint(20) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '商品名',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态10待领取20已领取',
  `orderd_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '订单时间',
  `get_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '领取时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `contacts` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '联系人',
  `contacts_phone` bigint(20) DEFAULT NULL COMMENT '联系人手机号',
  `contacts_email` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '联系邮箱',
  `integral` mediumint(9) DEFAULT NULL COMMENT '积分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='订单商品';

/*Data for the table `order_goods` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `order_user_id` bigint(20) DEFAULT NULL COMMENT '预约用户id',
  `order_user_phone` bigint(20) DEFAULT NULL COMMENT '预约手机号',
  `contacts` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '联系人',
  `contacts_phone` bigint(20) DEFAULT NULL COMMENT '联系人手机号',
  `contacts_email` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '联系邮箱',
  `order_user_name` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '预约姓名',
  `order_user_sex` tinyint(4) DEFAULT NULL COMMENT '预约性别,0先生1女士',
  `order_status` tinyint(4) DEFAULT NULL COMMENT '订单状态10:已预约20:已确认30:已完成40取消',
  `cancel_opinion` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '取消原因',
  `finish_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '完成时间',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `city` bigint(20) DEFAULT NULL COMMENT '城市,引用字典',
  `region` bigint(20) DEFAULT NULL COMMENT '区域,引用字典',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `order_remark` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '订单备注',
  `expect_order_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '预约时间',
  `expect_houses_id` bigint(20) DEFAULT NULL COMMENT '期望的房屋id',
  `expect_houses_room` bigint(20) DEFAULT NULL COMMENT '期望的房间id',
  `expect_houses_combo` bigint(20) DEFAULT NULL COMMENT '期望房间的套餐',
  `expect_checkin_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '期望的入住时间',
  `expect_need_room_num` tinyint(4) DEFAULT NULL COMMENT '期望的需要房间数量',
  `expect_checkin_day` tinyint(4) DEFAULT NULL COMMENT '期望的入住几天',
  `expect_coin` decimal(10,2) DEFAULT NULL COMMENT '预计精币',
  `expect_order_date2` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '预约时间',
  `houses_id` bigint(20) DEFAULT NULL COMMENT '房屋id',
  `houses_room` bigint(20) DEFAULT NULL COMMENT '房间id',
  `houses_combo` bigint(20) DEFAULT NULL COMMENT '房间的套餐',
  `checkin_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '入住时间',
  `need_room_num` tinyint(4) DEFAULT NULL COMMENT '需要房间数量',
  `heckin_day` tinyint(4) DEFAULT NULL COMMENT '入住几天',
  `coin` decimal(10,2) DEFAULT NULL COMMENT '精币',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='预约订单';

/*Data for the table `orders` */

/*Table structure for table `orders_log` */

DROP TABLE IF EXISTS `orders_log`;

CREATE TABLE `orders_log` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `order_id` bigint(20) DEFAULT NULL COMMENT '预约订单ID',
  `event_type` tinyint(4) DEFAULT NULL COMMENT '事件类型10:已预约20:已确认30:已完成40取消',
  `event_name` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '事件名字',
  `event_content` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '事件内容',
  `event_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '记录时间',
  `event_user_id` bigint(20) DEFAULT NULL COMMENT '记录人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='预约订单日志记录';

/*Data for the table `orders_log` */

/*Table structure for table `sys_article_declare` */

DROP TABLE IF EXISTS `sys_article_declare`;

CREATE TABLE `sys_article_declare` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `type` bigint(20) DEFAULT NULL COMMENT '类型',
  `title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8_bin COMMENT '内容',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统-条款声明';

/*Data for the table `sys_article_declare` */

/*Table structure for table `sys_coin` */

DROP TABLE IF EXISTS `sys_coin`;

CREATE TABLE `sys_coin` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `code` mediumint(9) DEFAULT NULL COMMENT '代码',
  `level` tinyint(4) DEFAULT NULL COMMENT '级别',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '名字',
  `rule_money` decimal(10,2) DEFAULT NULL COMMENT '规则金额',
  `get_coin` decimal(10,2) DEFAULT NULL COMMENT '获取的币',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='数据字典-精选币';

/*Data for the table `sys_coin` */

/*Table structure for table `sys_dict` */

DROP TABLE IF EXISTS `sys_dict`;

CREATE TABLE `sys_dict` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `code` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '字典代码',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '字典名字',
  `type` smallint(5) unsigned DEFAULT NULL COMMENT '类型',
  `parent_code` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '父字典代码',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父字典',
  `level` tinyint(4) DEFAULT NULL COMMENT '级别',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='数据字典';

/*Data for the table `sys_dict` */

insert  into `sys_dict`(`id`,`code`,`name`,`type`,`parent_code`,`parent_id`,`level`,`sort_order`,`status`,`creater`,`modifier`,`created_at`,`updated_at`) values (1472698591830,NULL,'ddd',1,NULL,NULL,1,NULL,1,331,331,'2016-09-01 10:56:27','2016-09-01 10:56:27'),(1472699028534,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:03:46','2016-09-01 11:03:46'),(1472699210916,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:06:46','2016-09-01 11:06:46'),(1472699237058,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:07:09','2016-09-01 11:07:09'),(1472699281221,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:07:53','2016-09-01 11:07:53'),(1472699422733,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:10:15','2016-09-01 11:10:15'),(1472699423663,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:10:19','2016-09-01 11:10:19'),(1472699781785,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:16:19','2016-09-01 11:16:19'),(1472699787693,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:16:21','2016-09-01 11:16:21'),(1472699806609,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:16:41','2016-09-01 11:16:41'),(1472699814670,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:16:53','2016-09-01 11:16:53'),(1472700331856,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:25:22','2016-09-01 11:25:22'),(1472700365369,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:25:59','2016-09-01 11:25:59'),(1472700383845,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:26:23','2016-09-01 11:26:23'),(1472700642613,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-01 11:30:41','2016-09-01 11:30:41'),(1472796751710,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-02 14:12:28','2016-09-02 14:12:28'),(1472796753455,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-02 14:12:30','2016-09-02 14:12:30'),(1472796961510,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-02 14:15:58','2016-09-02 14:15:58'),(1472796980586,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-02 14:16:13','2016-09-02 14:16:13'),(1472797021495,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-02 14:16:56','2016-09-02 14:16:56'),(1472799695380,NULL,'南美洲',1,NULL,NULL,1,NULL,1,331,331,'2016-09-02 15:01:25','2016-09-02 15:01:25'),(1472801106352,NULL,'123',1,NULL,NULL,1,NULL,1,331,331,'2016-09-02 15:24:58','2016-09-02 15:24:58'),(1473046448365,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 11:34:01','2016-09-05 11:34:01'),(1473049849188,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 12:30:39','2016-09-05 12:30:39'),(1473049904009,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 12:31:34','2016-09-05 12:31:34'),(1473050081193,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 12:34:31','2016-09-05 12:34:31'),(1473050086261,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 12:34:44','2016-09-05 12:34:44'),(1473050135347,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 12:35:32','2016-09-05 12:35:32'),(1473053909345,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 13:38:23','2016-09-05 13:38:23'),(1473055862250,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:10:58','2016-09-05 14:10:58'),(1473055888965,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:11:26','2016-09-05 14:11:26'),(1473056001709,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:13:18','2016-09-05 14:13:18'),(1473056145954,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:15:42','2016-09-05 14:15:42'),(1473056178728,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:16:11','2016-09-05 14:16:11'),(1473056263104,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:17:40','2016-09-05 14:17:40'),(1473056356896,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:19:08','2016-09-05 14:19:08'),(1473056389261,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:19:48','2016-09-05 14:19:48'),(1473056430586,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:20:26','2016-09-05 14:20:26'),(1473056694139,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:24:46','2016-09-05 14:24:46'),(1473056738925,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:25:37','2016-09-05 14:25:37'),(1473056754181,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:25:53','2016-09-05 14:25:53'),(1473056774043,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:26:08','2016-09-05 14:26:08'),(1473057221365,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:33:40','2016-09-05 14:33:40'),(1473057272450,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:34:22','2016-09-05 14:34:22'),(1473057326447,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:35:23','2016-09-05 14:35:23'),(1473057657251,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:40:51','2016-09-05 14:40:51'),(1473057702155,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:41:40','2016-09-05 14:41:40'),(1473057811342,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:43:22','2016-09-05 14:43:22'),(1473057910846,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:45:05','2016-09-05 14:45:05'),(1473057936021,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:45:28','2016-09-05 14:45:28'),(1473058000333,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 14:46:40','2016-09-05 14:46:40'),(1473058994950,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 15:03:14','2016-09-05 15:03:14'),(1473059055056,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 15:04:13','2016-09-05 15:04:13'),(1473059158205,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 15:05:56','2016-09-05 15:05:56'),(1473059279365,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-05 15:07:53','2016-09-05 15:07:53'),(1473125975689,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 09:39:35','2016-09-06 09:39:35'),(1473126071740,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 09:41:01','2016-09-06 09:41:01'),(1473126167556,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 09:42:46','2016-09-06 09:42:46'),(1473126816260,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 09:53:35','2016-09-06 09:53:35'),(1473145968338,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 15:12:39','2016-09-06 15:12:39'),(1473146362394,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 15:19:18','2016-09-06 15:19:18'),(1473146371066,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-06 15:19:30','2016-09-06 15:19:30'),(1473227293204,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 13:48:07','2016-09-07 13:48:07'),(1473227970122,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 13:59:28','2016-09-07 13:59:28'),(1473227999795,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 13:59:54','2016-09-07 13:59:54'),(1473228179472,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:02:57','2016-09-07 14:02:57'),(1473228282294,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:04:34','2016-09-07 14:04:34'),(1473228300279,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:04:50','2016-09-07 14:04:50'),(1473228320838,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:05:17','2016-09-07 14:05:17'),(1473229479230,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:24:29','2016-09-07 14:24:29'),(1473229530952,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:25:22','2016-09-07 14:25:22'),(1473229772973,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:29:27','2016-09-07 14:29:27'),(1473229789136,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:29:45','2016-09-07 14:29:45'),(1473229815357,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:30:13','2016-09-07 14:30:13'),(1473229845620,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:30:36','2016-09-07 14:30:36'),(1473229872515,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:31:05','2016-09-07 14:31:05'),(1473229919484,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:31:50','2016-09-07 14:31:50'),(1473230020460,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:33:34','2016-09-07 14:33:34'),(1473230033396,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:33:45','2016-09-07 14:33:45'),(1473230084601,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:34:35','2016-09-07 14:34:35'),(1473230208916,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:36:45','2016-09-07 14:36:45'),(1473230263337,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:37:34','2016-09-07 14:37:34'),(1473230268499,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:37:48','2016-09-07 14:37:48'),(1473230313908,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:38:32','2016-09-07 14:38:32'),(1473230466298,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:41:01','2016-09-07 14:41:01'),(1473230520457,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:41:54','2016-09-07 14:41:54'),(1473230564308,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:42:38','2016-09-07 14:42:38'),(1473230572418,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:42:51','2016-09-07 14:42:51'),(1473230875323,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:47:51','2016-09-07 14:47:51'),(1473230891320,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:48:06','2016-09-07 14:48:06'),(1473231022447,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:50:21','2016-09-07 14:50:21'),(1473231044614,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:50:43','2016-09-07 14:50:43'),(1473231068362,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:51:02','2016-09-07 14:51:02'),(1473231091956,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:51:26','2016-09-07 14:51:26'),(1473231119004,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:51:52','2016-09-07 14:51:52'),(1473231158824,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:52:35','2016-09-07 14:52:35'),(1473231246914,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:54:05','2016-09-07 14:54:05'),(1473231429267,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:57:05','2016-09-07 14:57:05'),(1473231478454,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:57:52','2016-09-07 14:57:52'),(1473231505563,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 14:58:22','2016-09-07 14:58:22'),(1473231918444,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:05:12','2016-09-07 15:05:12'),(1473231949010,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:05:47','2016-09-07 15:05:47'),(1473232045767,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:07:18','2016-09-07 15:07:18'),(1473232058341,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:07:37','2016-09-07 15:07:37'),(1473232093583,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:08:11','2016-09-07 15:08:11'),(1473232155273,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:09:09','2016-09-07 15:09:09'),(1473232163871,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:09:18','2016-09-07 15:09:18'),(1473232216839,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:10:15','2016-09-07 15:10:15'),(1473232280245,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:11:13','2016-09-07 15:11:13'),(1473232313203,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-07 15:11:47','2016-09-07 15:11:47'),(1473321197366,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 15:53:07','2016-09-08 15:53:07'),(1473321225869,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 15:53:38','2016-09-08 15:53:38'),(1473324916766,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 16:55:11','2016-09-08 16:55:11'),(1473324964891,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 16:55:59','2016-09-08 16:55:59'),(1473328474228,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 17:54:31','2016-09-08 17:54:31'),(1473328520056,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-08 17:55:12','2016-09-08 17:55:12'),(1473385767739,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-09 09:49:22','2016-09-09 09:49:22'),(1473399063339,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-09 13:30:57','2016-09-09 13:30:57'),(1473399235926,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,NULL,'2016-09-09 13:33:51','2016-09-09 13:33:51');

/*Table structure for table `sys_hot_keyword` */

DROP TABLE IF EXISTS `sys_hot_keyword`;

CREATE TABLE `sys_hot_keyword` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '名字',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统-热词';

/*Data for the table `sys_hot_keyword` */

/*Table structure for table `sys_houses_keyword` */

DROP TABLE IF EXISTS `sys_houses_keyword`;

CREATE TABLE `sys_houses_keyword` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '名字',
  `keyword_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '关键词描述',
  `picture` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '图片',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统-房屋关键字';

/*Data for the table `sys_houses_keyword` */

/*Table structure for table `sys_info_template` */

DROP TABLE IF EXISTS `sys_info_template`;

CREATE TABLE `sys_info_template` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `type` smallint(6) DEFAULT NULL COMMENT '模板类型，1000短信2000邮件3000消息',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '模板名称',
  `title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `content` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT '内容',
  `template_desc` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统消息模板';

/*Data for the table `sys_info_template` */

insert  into `sys_info_template`(`id`,`type`,`name`,`title`,`content`,`template_desc`,`creater`,`modifier`,`created_at`,`updated_at`,`status`) values (1,1000,'发送验证码','发送验证码','您的验证码是：{#code}，5分钟内有效。','发送短信模板1',NULL,NULL,'2016-08-18 15:29:13','2016-08-18 15:29:13',1),(2,1001,'入住酒店时间到了','入住酒店时间到了','尊敬的{#userName}您好，感谢您对精选者平台的信任，祝您在{#hotelName}渡过一段美妙时光，您可将您的入住体验分享至平台，让更多酒店爱家与您一同体验{#hotelName}。精选者地址：{#url}','发送短信模板1',NULL,NULL,'2016-08-18 15:29:13','2016-08-18 15:29:13',1),(3,1002,'确认入住酒店','确认入住酒店','尊敬的{#userName}，您好，您预订的{#hotelName}在{#intoDate}入住{#days}已确认，确认邮件已发送至您的邮箱，预订您有一个美好的假期！您本次使用精选币{#cost}，您的会员帐户余额为精选币{#fee}。','发送短信模板1',NULL,NULL,'2016-08-18 15:29:13','2016-08-18 15:29:13',1);

/*Table structure for table `sys_inform` */

DROP TABLE IF EXISTS `sys_inform`;

CREATE TABLE `sys_inform` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `type` tinyint(4) DEFAULT NULL COMMENT '消息类型，1通知2消息',
  `classify` smallint(6) DEFAULT NULL COMMENT '消息分类1文章',
  `info_level` tinyint(4) DEFAULT NULL COMMENT '消息级别',
  `title` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '消息标题',
  `content` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '消息内容',
  `url` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '消息连接',
  `send_user` bigint(20) DEFAULT NULL COMMENT '发送人',
  `receive_user` bigint(20) DEFAULT NULL COMMENT '接受人',
  `send_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发送时间',
  `read_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '阅读时间',
  `read_status` tinyint(4) DEFAULT '0' COMMENT '读取消息状态0未读1已读',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态0无效1有效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='通知';

/*Data for the table `sys_inform` */

/*Table structure for table `sys_integral` */

DROP TABLE IF EXISTS `sys_integral`;

CREATE TABLE `sys_integral` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `event_name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '名字',
  `integral` mediumint(9) DEFAULT NULL COMMENT '积分',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='数据字典-积分';

/*Data for the table `sys_integral` */

/*Table structure for table `sys_parameter` */

DROP TABLE IF EXISTS `sys_parameter`;

CREATE TABLE `sys_parameter` (
  `param_key` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '系统参数key',
  `param_value` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '系统参数值',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`param_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统参数';

/*Data for the table `sys_parameter` */

/*Table structure for table `sys_resources` */

DROP TABLE IF EXISTS `sys_resources`;

CREATE TABLE `sys_resources` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '资源名字',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父资源ID',
  `type` tinyint(4) DEFAULT NULL COMMENT '资源类型,0:菜单1:按钮',
  `url` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '资源url',
  `icon` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '资源icon',
  `level` tinyint(4) DEFAULT NULL COMMENT '资源级别',
  `sort_order` tinyint(4) DEFAULT NULL COMMENT '资源排序',
  `res_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='资源';

/*Data for the table `sys_resources` */

insert  into `sys_resources`(`id`,`name`,`parent_id`,`type`,`url`,`icon`,`level`,`sort_order`,`res_desc`,`creater`,`modifier`,`created_at`,`updated_at`,`status`) values (1472637910809,'配置管理',NULL,0,'config',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:05:04','2016-08-31 18:05:44',1),(1472637975485,'权限管理',1472637910809,0,'config/authority',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:06:06','2016-08-31 18:06:06',1),(1472638526649,'搜索热词配置',1472637910809,0,'config/hotwords',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:15:24','2016-08-31 18:15:24',1),(1472638727733,'角色管理配置',1472637975485,0,'config/authority/role',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:18:41','2016-08-31 18:18:41',1),(1472638864947,'管理员配置',1472637975485,0,'config/authority/manager',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:21:00','2016-08-31 18:21:00',1),(1472638891124,'权限列表',1472637975485,0,'config/authority/auth',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:21:24','2016-08-31 18:21:24',1),(1472639053983,'用户管理',NULL,0,'user',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:24:10','2016-08-31 18:24:10',1),(1472639087386,'积分管理',NULL,0,'integral',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:24:41','2016-08-31 18:24:41',1),(1472639126313,'文章管理',NULL,0,'article',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:25:16','2016-08-31 18:25:16',1),(1472639137731,'酒店管理',NULL,0,'hotel',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:25:35','2016-08-31 18:25:35',1),(1472639154979,'内容管理',NULL,0,'content',NULL,1,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:25:49','2016-08-31 18:26:05',1),(1472639216951,'区域配置',1472637910809,0,'config/area',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-08-31 18:26:51','2016-08-31 18:26:51',1),(1472707753652,'大洲配置',1472639216951,0,'config/area/list-state',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:29:10','2016-09-01 13:29:10',1),(1472707777261,'国家配置',1472639216951,0,'config/area/list-country',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:29:27','2016-09-01 13:29:27',1),(1472707977386,'区域列表',1472639216951,0,'config/area/list-region',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:32:50','2016-09-01 13:32:50',1),(1472708015941,'精选者管理',1472639053983,0,'user/user',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:33:30','2016-09-01 13:33:30',1),(1472708040533,'会员管理',1472639053983,0,'user/vip',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:33:53','2016-09-01 13:33:53',1),(1472708063237,'未绑定会员',1472639053983,0,'user/vip2',NULL,2,NULL,NULL,1471406458817,1471406458817,'2016-09-01 13:34:17','2016-09-01 13:34:17',1),(1472713591929,'列表操作',1472708015941,1,'user/user/operate',NULL,3,NULL,NULL,1471406458817,1471406458817,'2016-09-01 15:06:26','2016-09-01 15:06:26',1),(1472713970855,'角色添加',1472638727733,1,'config/authority/role/add',NULL,4,NULL,NULL,1471406458817,1471406458817,'2016-09-01 15:12:43','2016-09-01 15:16:48',1),(1472714037119,'角色操作',1472638727733,1,'config/authority/role/operate',NULL,4,NULL,NULL,1471406458817,1471406458817,'2016-09-01 15:13:47','2016-09-01 15:13:47',1),(1472794925728,'文章列表',1472639126313,0,'article/list',NULL,2,NULL,'',1472453950181,1472453950181,'2016-09-02 13:41:56','2016-09-02 13:42:11',1),(1472794982251,'添加文章',1472639126313,0,'article/add',NULL,2,NULL,NULL,1472453950181,1472453950181,'2016-09-02 13:43:00','2016-09-02 13:43:00',1),(1472795012280,'酒店列表',1472639137731,0,'hotel/list',NULL,2,NULL,NULL,1472453950181,1472453950181,'2016-09-02 13:43:23','2016-09-02 13:43:23',1),(1472795021128,'新增酒店',1472639137731,0,'hotel/add',NULL,2,NULL,NULL,1472453950181,1472453950181,'2016-09-02 13:43:35','2016-09-02 13:43:35',1),(1472795033437,'酒店亮点库',1472639137731,0,'hotel/feature',NULL,2,NULL,NULL,1472453950181,1472453950181,'2016-09-02 13:43:51','2016-09-02 13:43:51',1),(1472795066587,'酒店价格维护',1472639137731,0,'hotel/price',NULL,2,NULL,NULL,1472453950181,1472453950181,'2016-09-02 13:44:18','2016-09-02 13:44:18',1);

/*Table structure for table `sys_role_resources` */

DROP TABLE IF EXISTS `sys_role_resources`;

CREATE TABLE `sys_role_resources` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `resource_id` bigint(20) NOT NULL COMMENT '资源ID',
  `permissions` varchar(10) COLLATE utf8_bin DEFAULT NULL COMMENT '权限集 角色资源权限(R:查看;W:编辑;A:审核;D:删除;I:新增，多个权限由,连接)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色资源';

/*Data for the table `sys_role_resources` */

insert  into `sys_role_resources`(`id`,`role_id`,`resource_id`,`permissions`) values (1472723323510,1472715869245,1472713591929,NULL),(1472723324325,1472715869245,1472639137731,NULL),(1472723328164,1472715869245,1472708040533,NULL),(1472723328226,1472715869245,1472708015941,NULL),(1472723328433,1472715869245,1472708063237,NULL),(1472723330313,1472715869245,1472639053983,NULL),(1472796201832,1472639920988,1472639216951,NULL),(1472796202151,1472639920988,1472795021128,NULL),(1472796202200,1472639920988,1472795066587,NULL),(1472796202621,1472639920988,1472794982251,NULL),(1472796202814,1472639920988,1472638526649,NULL),(1472796203627,1472639920988,1472638891124,NULL),(1472796203765,1472639920988,1472708015941,NULL),(1472796203907,1472639920988,1472707753652,NULL),(1472796204197,1472639920988,1472794925728,NULL),(1472796204433,1472639920988,1472713970855,NULL),(1472796205098,1472639920988,1472638864947,NULL),(1472796205264,1472639920988,1472708040533,NULL),(1472796205509,1472639920988,1472637975485,NULL),(1472796205632,1472639920988,1472713591929,NULL),(1472796205799,1472639920988,1472714037119,NULL),(1472796206438,1472639920988,1472639137731,NULL),(1472796206537,1472639920988,1472795012280,NULL),(1472796207830,1472639920988,1472707777261,NULL),(1472796208467,1472639920988,1472639126313,NULL),(1472796208698,1472639920988,1472639053983,NULL),(1472796208815,1472639920988,1472707977386,NULL),(1472796209497,1472639920988,1472637910809,NULL),(1472796209618,1472639920988,1472708063237,NULL),(1472796210082,1472639920988,1472795033437,NULL),(1472796210114,1472639920988,1472638727733,NULL);

/*Table structure for table `sys_roles` */

DROP TABLE IF EXISTS `sys_roles`;

CREATE TABLE `sys_roles` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `name` varchar(27) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名',
  `role_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `set_type` char(6) COLLATE utf8_bin DEFAULT NULL COMMENT '置位',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色';

/*Data for the table `sys_roles` */

insert  into `sys_roles`(`id`,`name`,`role_desc`,`set_type`,`creater`,`modifier`,`created_at`,`updated_at`,`status`) values (1472639920988,'admin','超级管理员',NULL,NULL,NULL,'2016-08-31 18:38:38','2016-09-02 18:06:52',1),(1472715869245,'编辑','编辑描述',NULL,NULL,NULL,'2016-09-01 15:44:27','2016-09-02 18:06:54',2);

/*Table structure for table `sys_user_roles` */

DROP TABLE IF EXISTS `sys_user_roles`;

CREATE TABLE `sys_user_roles` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户角色';

/*Data for the table `sys_user_roles` */

insert  into `sys_user_roles`(`id`,`user_id`,`role_id`) values (1472723602171,1472453950181,1472639920988),(1472797055622,1471415842054,1472639920988);

/*Table structure for table `sys_users` */

DROP TABLE IF EXISTS `sys_users`;

CREATE TABLE `sys_users` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `account_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '账号,手机号?',
  `user_name` varchar(18) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `phone` bigint(20) DEFAULT NULL COMMENT '手机',
  `sex` tinyint(4) DEFAULT '2' COMMENT '性别,0男，1女，2保密',
  `city` bigint(20) DEFAULT NULL COMMENT '城市',
  `region` bigint(20) DEFAULT NULL COMMENT '区域,引用字典',
  `address` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '家庭住址',
  `head_portrait` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '头像',
  `email` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT 'mail',
  `info_integrity` tinyint(4) DEFAULT '0' COMMENT '信息完整度:0:资料填写不完整，1：资料填写完整',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `post_roles` bigint(20) DEFAULT NULL COMMENT '岗位角色',
  `last_login_ip` int(10) unsigned DEFAULT NULL COMMENT '最后一次登陆IP',
  `last_login_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后一次登陆日期',
  `passwd` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `users_id` bigint(20) DEFAULT NULL COMMENT '用户id，引用users',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';

/*Data for the table `sys_users` */

insert  into `sys_users`(`id`,`account_name`,`user_name`,`phone`,`sex`,`city`,`region`,`address`,`head_portrait`,`email`,`info_integrity`,`creater`,`modifier`,`created_at`,`updated_at`,`status`,`post_roles`,`last_login_ip`,`last_login_date`,`passwd`,`users_id`) values (1471415842054,'15928681754','倪祥',NULL,2,NULL,NULL,NULL,NULL,'nx@qq.com',0,NULL,NULL,'2016-08-17 14:37:14','2016-09-02 14:50:07',1,NULL,NULL,'2016-08-17 14:37:14','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',1471415839601),(1472453950181,'18010680802','郝洧',NULL,2,NULL,NULL,NULL,NULL,'haovei@gmail.com',0,NULL,NULL,'2016-08-29 14:59:02','2016-09-01 17:53:17',1,NULL,NULL,'2016-08-29 14:59:02','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',1472453946284);

/*Table structure for table `user_oauth` */

DROP TABLE IF EXISTS `user_oauth`;

CREATE TABLE `user_oauth` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型，1微信',
  `openid` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '第三方openid',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户第三方认证表';

/*Data for the table `user_oauth` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `account_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '账号,手机号',
  `phone` bigint(20) DEFAULT NULL COMMENT '手机',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `device_id` varchar(40) COLLATE utf8_bin DEFAULT NULL COMMENT '设备id',
  `last_login_ip` int(10) unsigned DEFAULT NULL COMMENT '最后一次登陆IP',
  `last_login_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后一次登陆日期',
  `is_activate` tinyint(4) DEFAULT NULL COMMENT '是否激活0未激活1激活',
  `personalized` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '个性签名',
  `join_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '加入时间',
  `user_vip_id` bigint(20) DEFAULT NULL COMMENT 'vip用户id',
  `user_name` varchar(18) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `sex` tinyint(4) DEFAULT '2' COMMENT '性别,0男，1女，2保密',
  `avatar` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '头像',
  `is_cover` tinyint(4) DEFAULT NULL COMMENT '是否封面0不是1是',
  `article_num` mediumint(9) DEFAULT NULL COMMENT '文章数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';

/*Data for the table `users` */

/*Table structure for table `users_at` */

DROP TABLE IF EXISTS `users_at`;

CREATE TABLE `users_at` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户人',
  `at_user_id` bigint(20) DEFAULT NULL COMMENT '被关注人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户关注';

/*Data for the table `users_at` */

/*Table structure for table `users_coin_log` */

DROP TABLE IF EXISTS `users_coin_log`;

CREATE TABLE `users_coin_log` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `event_type` mediumint(9) DEFAULT NULL COMMENT '事件类型',
  `event_name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '事件名称',
  `event_id` bigint(20) DEFAULT NULL COMMENT '事件id',
  `event_mode` bigint(20) DEFAULT NULL COMMENT '事件方式',
  `coin_money` decimal(10,2) DEFAULT NULL COMMENT '金额',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `coin_rule` bigint(20) DEFAULT NULL COMMENT '币规则,引用系统币',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-币日志';

/*Data for the table `users_coin_log` */

/*Table structure for table `users_favorite` */

DROP TABLE IF EXISTS `users_favorite`;

CREATE TABLE `users_favorite` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '点赞人',
  `favorite_type` tinyint(4) DEFAULT NULL COMMENT '收藏类型1文章',
  `favorite_source_id` bigint(20) DEFAULT NULL COMMENT '收藏源id',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户收藏';

/*Data for the table `users_favorite` */

/*Table structure for table `users_integral_log` */

DROP TABLE IF EXISTS `users_integral_log`;

CREATE TABLE `users_integral_log` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `event_id` bigint(20) DEFAULT NULL COMMENT '事件id',
  `event_name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '事件名称',
  `event_type` mediumint(9) DEFAULT NULL COMMENT '事件类型',
  `event_source` bigint(20) DEFAULT NULL COMMENT '事件源ID',
  `integral` mediumint(9) DEFAULT NULL COMMENT '积分',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-积分日志';

/*Data for the table `users_integral_log` */

/*Table structure for table `users_msg` */

DROP TABLE IF EXISTS `users_msg`;

CREATE TABLE `users_msg` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户人',
  `from_user_id` bigint(20) DEFAULT NULL COMMENT '被关注人',
  `content` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '内容',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  `read_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '读取时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户消息';

/*Data for the table `users_msg` */

/*Table structure for table `users_oauth_openid` */

DROP TABLE IF EXISTS `users_oauth_openid`;

CREATE TABLE `users_oauth_openid` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型，1微信',
  `openid` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '第三方id',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-第三方id';

/*Data for the table `users_oauth_openid` */

/*Table structure for table `users_openid` */

DROP TABLE IF EXISTS `users_openid`;

CREATE TABLE `users_openid` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型，1微信',
  `openid` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '第三方openid',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-openid';

/*Data for the table `users_openid` */

/*Table structure for table `users_pay_type` */

DROP TABLE IF EXISTS `users_pay_type`;

CREATE TABLE `users_pay_type` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型1微信2支付宝3银行卡',
  `name` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '账户名称',
  `pay_no` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '支付账户',
  `pay_name_id` bigint(20) DEFAULT NULL COMMENT '支付名称id,选择银行名称',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-支付类型';

/*Data for the table `users_pay_type` */

/*Table structure for table `users_vip` */

DROP TABLE IF EXISTS `users_vip`;

CREATE TABLE `users_vip` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `account_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '账号,手机号?',
  `user_name` varchar(18) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `passwd` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `phone` bigint(20) DEFAULT NULL COMMENT '手机',
  `sex` tinyint(4) DEFAULT '2' COMMENT '性别,0男，1女，2保密',
  `city` bigint(20) DEFAULT NULL COMMENT '城市',
  `region` bigint(20) DEFAULT NULL COMMENT '区域,引用字典',
  `address` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '家庭住址',
  `email` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT 'mail',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2锁住',
  `last_login_ip` int(10) unsigned DEFAULT NULL COMMENT '最后一次登陆IP',
  `last_login_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后一次登陆日期',
  `user_status` tinyint(4) DEFAULT NULL COMMENT '会员状态0未充值1已充值',
  `is_cover` tinyint(4) DEFAULT NULL COMMENT '是否封面0不是1是',
  `coin` decimal(10,2) DEFAULT NULL COMMENT '币',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-vip用户';

/*Data for the table `users_vip` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
