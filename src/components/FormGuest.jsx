export default function FormGuest() {
	return (
		<form action='https://submit-form.com/zq8ntdSi'>
			<label for='name'>Name</label>
			<input
				type='text'
				id='name'
				name='name'
				placeholder='Name'
				required=''
			/>
			<label for='email'>Email</label>
			<input
				type='email'
				id='email'
				name='email'
				placeholder='Email'
				required=''
			/>
			<label for='message'>Message</label>
			<textarea
				id='message'
				name='message'
				placeholder='Message'
				required=''></textarea>
			<button type='submit'>Send</button>
		</form>
	);
}
