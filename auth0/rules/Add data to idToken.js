function (user, context, callback) {
  const namespace = 'https://app.hackjunction.com/';
  const assignedRoles = (context.authorization || {}).roles || [];
 
  context.idToken[namespace + 'country'] = context.request.geoip.country_name;
  context.idToken[namespace + 'city'] = context.request.geoip.city_name;
  context.idToken[namespace + 'latitude'] = context.request.geoip.latitude;
  context.idToken[namespace + 'longitude'] = context.request.geoip.longitude;
  context.idToken[namespace + 'roles'] = user.roles;
  context.idToken[namespace + 'permissions'] = user.permissions;
  context.idToken[namespace + 'email'] = user.email;
  context.idToken[namespace + 'email_verified'] = user.email_verified;
  
  if (user.user_metadata) {
      context.idToken[namespace + 'recruiter_events'] = user.user_metadata.recruiterEvents || [];
    	context.idToken[namespace + 'recruiter_organisation'] = user.user_metadata.recruiterOrganisation;
  }


  callback(null, user, context);
}