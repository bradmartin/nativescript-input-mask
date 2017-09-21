import { textProperty } from 'tns-core-modules/ui/text-field/text-field-common'
import { completedProperty, extractedValueProperty, InputMaskBase, maskProperty } from './input-mask.common';

class ListenerImpl extends NSObject implements MaskedTextFieldDelegateListener {
	public static ObjCProtocols = [MaskedTextFieldDelegateListener];

	public static initWithOwner(owner: WeakRef<InputMask>) {
		const listener = ListenerImpl.new() as ListenerImpl;
		console.log('init called')
		listener._owner = owner;
		return listener;
	}

	public _owner: WeakRef<InputMask>;

	public textFieldDidFillMandatoryCharactersDidExtractValue(textField: UITextField, complete: boolean, value: string): void {
		const owner = this._owner.get();
		if (owner) {
			completedProperty.nativeValueChange(owner, complete);
			extractedValueProperty.nativeValueChange(owner, value);
		}
	}

}

class InputMaskDelegateImpl extends MaskedTextFieldDelegate {
	public static ObjCProtocols = [UITextFieldDelegate];

	public static initWithOwnerAndDefault(owner: WeakRef<InputMask>, defaultImpl: UITextFieldDelegate): InputMaskDelegateImpl {
		const delegate = <InputMaskDelegateImpl>InputMaskDelegateImpl.new();
		delegate._defaultImpl = defaultImpl;
		delegate._owner = owner;
		return delegate;
	}

	private _owner: WeakRef<InputMask>;
	private _defaultImpl: UITextFieldDelegate;

  public textFieldShouldBeginEditing(textField: UITextField): boolean {
  	return this._defaultImpl.textFieldShouldBeginEditing(textField);
  }

  public textFieldDidEndEditing(textField: UITextField) {
  	return this._defaultImpl.textFieldDidEndEditing(textField);
  }

  public textFieldShouldClear(textField: UITextField) {
  	return this._defaultImpl.textFieldShouldClear(textField);
  }

  public textFieldShouldReturn(textField: UITextField): boolean {
		return this._defaultImpl.textFieldShouldReturn(textField);
  }

	public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
		const owner = this._owner.get();
		super.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
		if (owner) {
			textProperty.nativeValueChange(owner, textField.text);
		}
		return false;
	}
	
}

export class InputMask extends InputMaskBase {
	private _delegate: InputMaskDelegateImpl;
	private _ios: UITextField;
	private _listener: ListenerImpl;

	constructor() {
		super();
		const owner = new WeakRef(this);
		this._delegate = InputMaskDelegateImpl.initWithOwnerAndDefault(owner, this._delegate);
		this._listener = ListenerImpl.initWithOwner(owner);
		this._delegate.listener = this._listener;
	}

	[completedProperty.setNative](completed: boolean) {
		// Should not be manually set
	}

	[extractedValueProperty.setNative](value: string) {
		// Should not be manually set
	}

	[maskProperty.setNative](mask: string) {
		this._delegate.maskFormat = mask;
		this[textProperty.setNative](this.text);
	}

	[textProperty.setNative](text: string) {
		this._delegate.putWithTextInto(text, this._ios)
	}

}
