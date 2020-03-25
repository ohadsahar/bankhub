import bootstrapDb from '../config/db.config';
import {AuthService} from '../api/services/auth.service';
import {Container} from 'typedi';

const authService = Container.get(AuthService);

const phoneNumber = '+9720526477497';
beforeAll(async () => {
    await bootstrapDb();
})

test('Send sms to client', async () => {
    const result = await authService.sendSms(phoneNumber);
    expect(result).toHaveProperty('accountSid')
});

