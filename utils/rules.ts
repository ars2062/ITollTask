export const required = (v) => !!v || 'this field is required'
export const email = (v) =>
  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(
    v
  ) || 'please enter a valid email address'
