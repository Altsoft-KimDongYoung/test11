/*
 * NUMBER: 숫자만
 * PHONE_NUMBER: 01N-NNNN-NNNN
 * NAME: 한글 2 ~ 24글자
 * NICKNAME: 한글, 영어, 숫자, 공백, 1 ~ 12자
 * ID: 영어 (소, 대문자), 숫자, 6 ~ 12자
 * PASSWORD: 영어(소, 대문자), 숫자, 특수문자(!@#$%^&*()-_+=), 8자 이상
 * MULTIPLE_NEWLINES: 연속된 줄바꿈 문자
 */
export const REG_EXP = {
  NUMBER: /^\d*$/,
  PHONE_NUMBER: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
  NAME: /^((?![ㄱ-ㅎㅏ-ㅣ])[가-힣a-zA-Z]){2,24}$/,
  NICKNAME: /^([가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]){1,12}$/,
  ID: /^[a-zA-Z0-9]{6,12}$/,
  PASSWORD:
    /^(?=.*[a-zA-Z\d!@#$%^&amp;*()\-_=+/?.,&lt;&gt;~₩[\]])[a-zA-Z\d!@#$%^&amp;*()\-_=+/?.,&lt;&gt;~₩[\]]{8,}$/,
  BUSINESS_NUMBER: /^\d{3}-\d{2}-\d{5}$/,
  CONTACT_NUMBER: /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/,
  DATE: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
  EMAIL: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  HTML_TEXT: /<[^>]*>?/g,
  MULTIPLE_NEWLINES: /(\r\n|\r|\n){3,}/g,
  NUMBER_OR_ALPHABET: /^[a-zA-Z0-9]*$/,
  HOMEPAGE_URL: /^(http|https):\/\//,
  SPECIAL_CHAR_HASHTAG: /[\p{S}\p{P}\p{C}]/u,
  IMAGE_TAG: /<img\s+[^>]*src="[^"]*"[^>]*>/g,
  IMAGE_FILE: /\.(jpg|jpeg|png|gif)$/i,
  VIDEO_FILE: /\.(mp4|mov)$/i,
} as const;
