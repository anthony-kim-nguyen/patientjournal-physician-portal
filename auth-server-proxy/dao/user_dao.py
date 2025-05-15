from sqlalchemy.orm import Session
from models.user import User

#return a user by username
def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()
#create a user in the db
def create_user(db: Session, user: User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
