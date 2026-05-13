 export function Form() {
  return `
        <div id = "reg-form-main">
            <form id="registration-form">
                <h2>Registration Form</h2>

                <label>Full Name</label>
                <input type="text" id="full-name" class = "input-fields">
                
                <label>Email</label>
                <input type="text" id="email-address" class = "input-fields">
              
                <label>Phone</label>
                <input type="phone" id="phone-number" pattern="[0-9+]+" required class = "input-fields">
                
                <div class="form-group">
                    <label>Gender:</label>
                    <label>
                        <input type="radio" name="gender" value="Male"> Male
                    </label>

                    <label>
                        <input type="radio" name="gender" value="Female"> Female
                    </label>

                    <label>
                        <input type="radio" name="gender" value="Other"> Other
                    </label>
                </div>

                <button type="submit" id ="submit-button">
                Submit
                </button>
            </form>
        </div>`;
 }