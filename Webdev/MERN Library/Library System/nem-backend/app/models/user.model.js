module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            email: String,
            password: String,
            image: String,
            admin: Boolean
          },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    }); //check
  
    const User = mongoose.model("user", schema);
    return User;
  };