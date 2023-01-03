const withAuth = (req, res, next) => {
  if (!req.session.loggedIn){
    // Redirect to login once that is set up. 
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = withAuth;