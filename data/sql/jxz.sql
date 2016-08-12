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
  `season` tinyint(4) DEFAULT NULL COMMENT '季节1淡季2旺季3高峰',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `price_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '价格描述',
  `creater` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modifier` bigint(20) DEFAULT NULL COMMENT '修改人',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态1正常0删除2未启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房屋-房间';

/*Data for the table `houses_room` */

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

/*Table structure for table `sys_user_roles` */

DROP TABLE IF EXISTS `sys_user_roles`;

CREATE TABLE `sys_user_roles` (
  `id` bigint(20) NOT NULL COMMENT '主键ID，由程序生成',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户角色';

/*Data for the table `sys_user_roles` */

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';

/*Data for the table `sys_users` */

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户-vip用户';

/*Data for the table `users_vip` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
