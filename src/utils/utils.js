//кнопки//
export const infoEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar');

//попапы//
export const popupTypeAdd = document.querySelector('.popup_type_add');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeAvatar = document.querySelector('.popup_type_avatar');
export const popupTypeDelete = document.querySelector('.popup_type_delete');


export const popupTypePicture = document.querySelector('.popup_type_picture');
export const popupPhoto = popupTypePicture.querySelector('.popup__image');
export const popupSubtitle = popupTypePicture.querySelector('.popup__subtitle');
export const popupList = Array.from(document.querySelectorAll('.popup'));


//инпуты в формах//
export const formCardName = document.querySelector('.form__item_el_card-name');
export const formCardLink = document.querySelector('.form__item_el_link');


export const nameInput = document.querySelector('.form__item_el_name');
export const jobInput = document.querySelector('.form__item_el_text');
export const formEdit = popupTypeEdit.querySelector('.form');
export const formAdd = popupTypeAdd.querySelector('.form');


//template//
export const template = document.querySelector('.cards__list');



