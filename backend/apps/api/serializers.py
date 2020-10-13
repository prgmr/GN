from django.contrib.auth import get_user_model
from rest_framework import serializers

from user.models import UserBalance, UserCall


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    last_name = serializers.CharField(max_length=250)
    first_name = serializers.CharField(max_length=250)
    description = serializers.CharField(max_length=500)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'last_name', 'first_name', 'description')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password')
        if password is not None:
            instance.set_password(password)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance


class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBalance
        fields = '__all__'


class UserCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCall
        fields = '__all__'
