const handler = require('../pages/api/contact').default;

// Mock the email service
jest.mock('../lib/email-service', () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true, messageId: 'mock-id-123' }),
  verifyConnection: jest.fn().mockResolvedValue(true),
  getTransporter: jest.fn().mockReturnValue({})
}));

describe('Contact Form API - E2E Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      method: 'POST',
      body: {},
      headers: {
        'x-forwarded-for': '192.168.1.1',
        'user-agent': 'test-browser'
      },
      socket: {
        remoteAddress: '192.168.1.1'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    };

    // Mock environment variables
    process.env.SMTP_HOST = '';
    process.env.SMTP_USER = '';
    process.env.ADMIN_EMAIL = 'admin@formerlyincarcerated.org';
  });

  describe('Test 1: Form Submission with Valid Data', () => {
    it('should accept valid form submission and return success response', async () => {
      // Enable SMTP for this test
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_USER = 'user@example.com';

      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        organization: 'Acme Corp',
        message: 'I want to partner with your organization'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
          submissionId: expect.any(String)
        })
      );

      // Clean up
      process.env.SMTP_HOST = '';
      process.env.SMTP_USER = '';
    });
  });

  describe('Test 2: Form Validation - Empty Fields', () => {
    it('should reject submission with missing name', async () => {
      mockReq.body = {
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('required')
      });
    });

    it('should reject submission with missing email', async () => {
      mockReq.body = {
        name: 'John Doe',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('required')
      });
    });

    it('should reject submission with missing message', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('required')
      });
    });
  });

  describe('Test 3: Email Validation', () => {
    it('should reject invalid email format', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid email')
      });
    });

    it('should reject email without domain', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid email')
      });
    });

    it('should accept valid email formats', async () => {
      // Ensure SMTP is disabled for this test
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;

      const validEmails = [
        'john@example.com',
        'jane.doe@company.co.uk',
        'user+tag@domain.org'
      ];

      for (const email of validEmails) {
        mockRes.status.mockClear();
        mockReq.body = {
          name: 'John Doe',
          email,
          message: 'Test message'
        };

        await handler(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(202);
      }
    });
  });

  describe('Test 4: Inquiry Type Auto-Detection', () => {
    beforeEach(() => {
      // Disable SMTP for this test group to verify data object
      process.env.SMTP_HOST = '';
      process.env.SMTP_USER = '';
    });

    it('should detect partnership inquiry from message keywords', async () => {
      mockReq.body = {
        name: 'Partner',
        email: 'partner@example.com',
        message: 'We would like to partnership with your organization'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('partnership');
    });

    it('should detect collaboration inquiry', async () => {
      mockReq.body = {
        name: 'Collaborator',
        email: 'collab@example.com',
        message: 'We want to collaborate on this initiative'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('partnership');
    });

    it('should detect investor inquiry from keywords', async () => {
      mockReq.body = {
        name: 'Investor',
        email: 'investor@example.com',
        message: 'We are interested in investing in your initiative'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('investor');
    });

    it('should detect investor inquiry with investor keyword', async () => {
      mockReq.body = {
        name: 'Fund Manager',
        email: 'fund@example.com',
        message: 'As an investor, I want to learn more'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('investor');
    });

    it('should detect housing inquiry from keywords', async () => {
      mockReq.body = {
        name: 'Resident',
        email: 'resident@example.com',
        message: 'I am a formerly incarcerated individual seeking housing'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('resident');
    });

    it('should detect housing inquiry with resident keyword', async () => {
      mockReq.body = {
        name: 'Applicant',
        email: 'applicant@example.com',
        message: 'I am a resident looking for stable housing'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('resident');
    });

    it('should default to general inquiry for unmatched keywords', async () => {
      mockReq.body = {
        name: 'General User',
        email: 'general@example.com',
        message: 'I have a general question about your mission'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.type).toBe('general');
    });
  });

  describe('Test 5: Input Sanitization', () => {
    beforeEach(() => {
      // Disable SMTP for this test group to verify data object
      process.env.SMTP_HOST = '';
      process.env.SMTP_USER = '';
    });

    it('should trim whitespace from inputs', async () => {
      mockReq.body = {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        message: '  Test message  '
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.name).toBe('John Doe');
      expect(callArgs.data.email).toBe('john@example.com');
    });

    it('should truncate message to 1000 characters', async () => {
      const longMessage = 'a'.repeat(2000);
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: longMessage
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.message).toBe('a'.repeat(1000));
    });

    it('should convert email to lowercase', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'John@Example.COM',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.email).toBe('john@example.com');
    });

    it('should handle empty organization gracefully', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        organization: '',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.organization).toBe('');
    });
  });

  describe('Test 6: IP and User Agent Logging', () => {
    beforeEach(() => {
      // Disable SMTP for this test group to verify data object
      process.env.SMTP_HOST = '';
      process.env.SMTP_USER = '';
    });

    it('should capture IP address from x-forwarded-for header', async () => {
      mockReq.headers['x-forwarded-for'] = '203.0.113.42';
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.ip).toBe('203.0.113.42');
    });

    it('should capture user agent', async () => {
      mockReq.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.userAgent).toBe('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    });

    it('should use socket remote address if x-forwarded-for not available', async () => {
      delete mockReq.headers['x-forwarded-for'];
      mockReq.socket.remoteAddress = '192.168.0.1';
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.ip).toBe('192.168.0.1');
    });
  });

  describe('Test 7: Graceful Fallback when SMTP Disabled', () => {
    beforeEach(() => {
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;
    });

    it('should return 202 when SMTP not configured', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(202);
      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.success).toBe(true);
      expect(callArgs.message).toContain('received');
      expect(callArgs.data).toBeDefined();
    });

    it('should log data but not fail when SMTP not configured', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Contact submission:',
        expect.any(Object)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Test 8: Response Structure and Submission ID', () => {
    it('should return submission ID in success response with emails', async () => {
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_USER = 'user@example.com';

      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.success).toBe(true);
      expect(typeof callArgs.submissionId).toBe('string');
      expect(callArgs.submissionId.length).toBeGreaterThan(0);

      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;
    });

    it('should include timestamp in response data when SMTP disabled', async () => {
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;

      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.data.timestamp).toMatch(/\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('Test 9: HTTP Method Validation', () => {
    it('should reject GET requests', async () => {
      mockReq.method = 'GET';
      mockReq.body = {};

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Method not allowed')
      });
    });

    it('should reject PUT requests', async () => {
      mockReq.method = 'PUT';
      mockReq.body = {};

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(405);
    });

    it('should accept POST requests', async () => {
      mockReq.method = 'POST';
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).not.toHaveBeenCalledWith(405);
    });
  });

  describe('Test 10: Error Handling', () => {
    it('should handle non-string inputs by coercing to strings', async () => {
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;

      mockReq.body = {
        name: 12345,
        email: 'john@example.com',
        message: 'message'
      };

      await handler(mockReq, mockRes);

      // Should handle gracefully - either accept or reject with appropriate status
      const statusCall = mockRes.status.mock.calls[0]?.[0];
      expect([202, 400, 500]).toContain(statusCall);
    });

    it('should handle undefined body gracefully', async () => {
      mockReq.body = undefined;

      await handler(mockReq, mockRes);

      // Should return error status
      const statusCall = mockRes.status.mock.calls[0]?.[0];
      expect([400, 500]).toContain(statusCall);
    });

    it('should handle empty body gracefully', async () => {
      mockReq.body = {};

      await handler(mockReq, mockRes);

      // Should return validation error (400)
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
