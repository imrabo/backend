const responseHandler = (res, status, success, msg, data = null) => {
    res.status(status).json({
      success,
      status,
      msg,
      data,
    });
  };
  
  export default responseHandler;
  