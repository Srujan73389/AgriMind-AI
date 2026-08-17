import pytest
from agrimind.notifications import NotificationDispatcher

class MockChannel:
    def __init__(self):
        self.sent_messages = []
    
    def send(self, user_id, message):
        self.sent_messages.append((user_id, message))

def test_notification_dispatcher_critical():
    dispatcher = NotificationDispatcher()
    sms_channel = MockChannel()
    email_channel = MockChannel()
    app_channel = MockChannel()
    
    dispatcher.register_channel("sms", sms_channel)
    dispatcher.register_channel("email", email_channel)
    dispatcher.register_channel("app", app_channel)
    
    dispatcher.dispatch(user_id=1, message="Frost warning!", priority="critical")
    
    # Critical should go to all channels
    assert len(sms_channel.sent_messages) == 1
    assert len(email_channel.sent_messages) == 1
    assert len(app_channel.sent_messages) == 1

def test_notification_dispatcher_low():
    dispatcher = NotificationDispatcher()
    sms_channel = MockChannel()
    app_channel = MockChannel()
    
    dispatcher.register_channel("sms", sms_channel)
    dispatcher.register_channel("app", app_channel)
    
    dispatcher.dispatch(user_id=1, message="Weekly report ready", priority="low")
    
    # Low priority should only go to app, not SMS
    assert len(sms_channel.sent_messages) == 0
    assert len(app_channel.sent_messages) == 1
