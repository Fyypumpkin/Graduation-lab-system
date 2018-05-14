package cn.fyypumpkin.manage.lab.realm;

import cn.fyypumpkin.manage.lab.entity.User;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * @author fyypumpkin on 2018/5/14.
 */

public class ShiroRealm extends AuthorizingRealm {
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        String username = (String) principalCollection.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        // TODO 数据库获取用户权限角色信息
        User<String> user = new User<>();
        authorizationInfo.setRoles(user.getRoles());
        authorizationInfo.setStringPermissions(user.getPermissions());
        System.out.println("Shiro授权");
        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = (String) token.getPrincipal();                //得到用户名
        String password = new String((char[]) token.getCredentials());  //得到密码

        User user = new User();

        /**检测是否有此用户 **/
        if (user == null) {
            throw new UnknownAccountException();//没有找到账号异常
        }
        /**检验账号是否被锁定 **/
        if (Boolean.TRUE.equals(user.getLocked())) {
            throw new LockedAccountException();//抛出账号锁定异常
        }
        /**AuthenticatingRealm使用CredentialsMatcher进行密码匹配**/
        if (null != username && null != password) {
            return new SimpleAuthenticationInfo(username, password, getName());
        } else {
            return null;
        }
    }

}
