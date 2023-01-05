const withAuth = (req, res, next) => {
  if (!req.session.loggedIn){
    // Redirect to login once that is set up. 
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;