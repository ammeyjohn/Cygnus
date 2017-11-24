module.exports = {
    /* 定义MongoDB数据库访问配置 */
    db: {
        addr: 'mongodb://128.1.10.21:27017/cygnus_dev',
        userName: null,
        password: null
    },

    /* 定义MongoDB数据库访问配置 */
    mongo: {
        addr: 'mongodb://128.1.10.21:27017/cygnus_dev',
        userName: null,
        password: null
    },

    /* 定义LDAP访问配置 */
    ldap: {
        url: 'ldap://128.1.1.20',
        baseDN: 'OU=公司员工,DC=shanghai3h,DC=com'
    }
}